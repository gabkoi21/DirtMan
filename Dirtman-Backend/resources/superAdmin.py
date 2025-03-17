from flask.views import MethodView
from flask_smorest import Blueprint, abort
from models import UserModel, RoleModel, CompanyModel 
from schemas import UserSchema ,  LoginSchema
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token, create_refresh_token,  get_jwt_identity, jwt_required
from utils.decorators import role_required
from db import db

# Initialize the Blueprint for Super Admin routes
blp = Blueprint("SuperAdmin", __name__, url_prefix="/superadmin", description="Operations for Super Admin")

@blp.route("/register")
class SuperAdminRegister(MethodView):
    @blp.arguments(UserSchema)
    def post(self, user_data):
        if UserModel.query.filter(UserModel.email == user_data["email"]).first():
            abort(409, message="A User with this email already exists.")

        # Create Super Admin user
        user = UserModel(
            email=user_data["email"],
            password=pbkdf2_sha256.hash(user_data["password"]),
            name=user_data["name"],
            roles=[RoleModel.query.filter_by(role='super_admin').first()],
        )
        db.session.add(user)
        db.session.commit()

        return {"Message": "Super Admin created successfully"}, 201

@blp.route("/login")
class SuperAdminLogin(MethodView):
   @blp.arguments(LoginSchema)
   def post(self, user_data):
        user = UserModel.query.filter(UserModel.email == user_data["email"]).first()
        if not user or not pbkdf2_sha256.verify(user_data["password"], user.password):
            abort(401, message="Invalid credentials")
        
        # Add roles to the token claims
        additional_claims = {
            "roles": [role.role for role in user.roles]
        }
        
        access_token = create_access_token(
            identity=str(user.id), 
            additional_claims=additional_claims
        )
        refresh_token = create_refresh_token(identity=str(user.id))
        return {"access_token": access_token, "refresh_token": refresh_token}, 200

@blp.route('/companies/<int:company_id>/assign-admin')  
class AssignAdmin(MethodView):
    @blp.arguments(UserSchema)
    @blp.response(200, UserSchema)
    @role_required('super_admin')
    def post(self, user_data, company_id):
        """Assign an admin to a company (Super Admin only)"""
        company = CompanyModel.query.get_or_404(company_id)
        user = UserModel(**user_data)
        admin_role = RoleModel.query.filter_by(role='admin').first()  
        if not admin_role:
            abort(404, message="Admin role not found.")
        user.roles.append(admin_role)
        user.company_id = company.id
        db.session.add(user)
        db.session.commit()
        return user