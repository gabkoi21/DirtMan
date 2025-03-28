from flask.views import MethodView
from flask_smorest import Blueprint, abort
from models import UserModel, RoleModel, CompanyModel
from passlib.hash import pbkdf2_sha256
from schemas import CompanySchema, UserSchema 
from utils.decorators import role_required
from db import db

# Initialize the Blueprint for company-related routes
blp = Blueprint("companies", __name__, url_prefix="/companies", description="Operations on companies")


# This is to register and create it admin along the user and the 
@blp.route('/create')
class CreateCompany(MethodView):
    @blp.arguments(CompanySchema)
    @blp.response(201, CompanySchema)
    @role_required('super_admin')
    def post(self, company_data):
        """
        Create a new company and assign an admin to it.
        Only accessible by Super Admin.
        
        """
        def create_company(company_data):
            """Helper function to create a new company."""
            company = CompanyModel(name=company_data['name'])
            db.session.add(company)
            db.session.commit()
            return company

        def create_admin_user(admin_data, company_id):
            """Helper function to create an admin user."""
            if UserModel.query.filter_by(email=admin_data['email']).first():
                abort(409, message="A user with this email already exists.")

            admin_user = UserModel(
                email=admin_data['email'],
                password=pbkdf2_sha256.hash(admin_data['password']), 
                name=admin_data['name'],
                phone_number=admin_data["phone_number"],
                user_type="admin",
                company_id=company_id  
            )

            admin_role = RoleModel.query.filter_by(role='admin').first()
            if not admin_role:
                abort(404, message="Admin role not found.")

            admin_user.roles.append(admin_role)
            db.session.add(admin_user)
            db.session.commit()
            return admin_user

        company = create_company(company_data)
        admin_data = company_data.get('admin_user')
        if not admin_data:
            abort(400, message="Admin user data must be provided.")

        create_admin_user(admin_data, company.id)
        return {"Message": "Company and its Admin created successfully"}, 201


# This is  to add Admin to it existing company
@blp.route('/<int:company_id>/add-admin')
class AddAdminToCompany(MethodView):
    @blp.arguments(UserSchema)
    @blp.response(201, UserSchema)
    @role_required('super_admin')
    def post(self, user_data, company_id):
        """
        Add an admin to an existing company.
        Only accessible by Super Admin.
        """
        def create_admin_user(admin_data, company_id):
            """Helper function to create an admin user."""
            if UserModel.query.filter_by(email=admin_data['email']).first():
                abort(409, message="A user with this email already exists.")

            admin_user = UserModel(
                email=admin_data['email'],
                password=pbkdf2_sha256.hash(admin_data['password']), 
                name=admin_data['name'],
                phone_number=admin_data["phone_number"],
                user_type="admin",
                company_id=company_id  
            )

            admin_role = RoleModel.query.filter_by(role='admin').first()
            if not admin_role:
                abort(404, message="Admin role not found.")

            admin_user.roles.append(admin_role)
            db.session.add(admin_user)
            db.session.commit()
            return admin_user

        company = CompanyModel.query.get_or_404(company_id)
        admin_user = create_admin_user(user_data, company.id)
        return admin_user
    


# This is to delete the company and it exsiting iformation
@blp.route('/<int:company_id>')
class CompanyDetails(MethodView):
    @blp.response(200, CompanySchema)
    @role_required('super_admin')
    def delete(self, company_id):
        """
        Delete a company and all associated users and roles.
        Only accessible by Super Admin.
        """
        company = CompanyModel.query.get_or_404(company_id)
        
        # Manually delete all users associated with the company
        users = UserModel.query.filter_by(company_id=company_id).all()
        for user in users:
            user.roles = []
            db.session.delete(user)
        
        # Delete the company
        db.session.delete(company)
        db.session.commit()
        
        return {"Message": "Company and all associated users and roles deleted successfully."}