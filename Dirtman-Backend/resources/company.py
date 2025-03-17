from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt
from models import UserModel, RoleModel, CompanyModel
from schemas import CompanySchema, UserSchema
from utils.decorators import role_required
from passlib.hash import pbkdf2_sha256
from db import db

# Initialize the Blueprint for company-related routes
blp = Blueprint("companies", __name__, url_prefix="/companies", description="Operations on companies")

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
        # Step 1: Create a new company
        company = CompanyModel(name=company_data['name'])
        db.session.add(company)
        db.session.commit()

        # Step 2: Assign an admin to the new company
        admin_data = company_data.get('admin_user')
        if not admin_data:
            abort(400, message="Admin user data must be provided.")

        # Step 3: Validate if the admin email already exists
        if UserModel.query.filter_by(email=admin_data['email']).first():
            abort(409, message="A user with this email already exists.")

        # Step 4: Create the admin user
        admin_user = UserModel(
            email=admin_data['email'],
            password=pbkdf2_sha256.hash(admin_data['password']),  # Hash the password
            name=admin_data['name'],
            company_id=company.id  # Link the admin to the newly created company
        )

        # Step 5: Fetch the admin role
        admin_role = RoleModel.query.filter_by(role='admin').first()
        if not admin_role:
            abort(404, message="Admin role not found.")

        # Step 6: Assign the admin role to the user
        admin_user.roles.append(admin_role)

        # Step 7: Save the admin user to the database
        db.session.add(admin_user)
        db.session.commit()

        # Step 8: Return the created company info
        return {"Message": "Company and it's Admin created successfully"}, 201

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
        # Step 1: Check if the company exists
        company = CompanyModel.query.get_or_404(company_id)

        # Step 2: Check if the email already exists
        if UserModel.query.filter_by(email=user_data["email"]).first():
            abort(409, message="A user with this email already exists.")

        # Step 3: Create the admin user
        admin_user = UserModel(
            email=user_data["email"],
            password=pbkdf2_sha256.hash(user_data["password"]),  # Hash the password
            name=user_data["name"],
            company_id=company.id  # Link the admin to the company
        )

        # Step 4: Fetch the admin role
        admin_role = RoleModel.query.filter_by(role='admin').first()
        if not admin_role:
            abort(404, message="Admin role not found.")

        # Step 5: Assign the admin role to the user
        admin_user.roles.append(admin_role)

        # Step 6: Save the admin user to the database
        db.session.add(admin_user)
        db.session.commit()

        return admin_user
    
    
    
    # This is to see if it works in git 