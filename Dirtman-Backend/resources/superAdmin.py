from flask.views import MethodView
from flask_smorest import Blueprint, abort
from models import UserModel, RoleModel, CompanyModel
from schemas import UserSchema, LoginSchema
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token, create_refresh_token
from utils.decorators import role_required
from db import db

# Initialize the Blueprint for Super Admin routes
blp = Blueprint("SuperAdmin", __name__, url_prefix="/superadmin", description="Operations for Super Admin")


@blp.route("/register")
class SuperAdminRegister(MethodView):
    @blp.arguments(UserSchema)
    def post(self, user_data):
        if UserModel.query.filter_by(email=user_data["email"]).first():
            abort(409, message="A User with this email already exists.")

        # Ensure "super_admin" role exists
        super_admin_role = RoleModel.query.filter_by(role="super_admin").first()
        if not super_admin_role:
            abort(500, message="Super Admin role not found. Please create it first.")

        # Create Super Admin user
        user = UserModel(
            email=user_data["email"],
            password=pbkdf2_sha256.hash(user_data["password"]),
            name=user_data["name"],
            phone_number=user_data["phone_number"],
            user_type="super_admin",  
            roles=[super_admin_role], 
        )

        db.session.add(user)
        db.session.commit()

        return {"message": "Super Admin created successfully"}, 201


@blp.route("/login")
class SuperAdminLogin(MethodView):
    @blp.arguments(LoginSchema)
    def post(self, user_data):
        user = UserModel.query.filter_by(email=user_data["email"]).first()
        
        # Validate email and password
        if not user or not pbkdf2_sha256.verify(user_data["password"], user.password):
            abort(401, message="Invalid credentials")

       
        if user.user_type != "super_admin":
            abort(403, message="Access denied, Only Super Admins can log in here.")


        additional_claims = {
            "roles": [role.role for role in user.roles]
        }

        access_token = create_access_token(identity=str(user.id), additional_claims=additional_claims)
        refresh_token = create_refresh_token(identity=str(user.id))

        return {"access_token": access_token, "refresh_token": refresh_token}, 200


@blp.route('/companies/<int:company_id>/assign-admin')
class AssignAdmin(MethodView):
    @blp.arguments(UserSchema)
    @blp.response(200, UserSchema)
    @role_required("super_admin")  
    def post(self, user_data, company_id):
        """Assign an admin to a company (Super Admin only)"""
        company = CompanyModel.query.get_or_404(company_id)

       
        admin_role = RoleModel.query.filter_by(role="admin").first()
        if not admin_role:
            abort(404, message="Admin role not found.")

        # Create Admin User
        user = UserModel(
            email=user_data["email"],
            password=pbkdf2_sha256.hash(user_data["password"]),
            name=user_data["name"],
            phone_number=user_data["phone_number"],
            user_type="admin",  
            roles=[admin_role],  
            company_id=company.id,
        )

        db.session.add(user)
        db.session.commit()

        return user


