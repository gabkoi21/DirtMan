from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt
from models import UserModel, RoleModel
from schemas import UserSchema, LoginSchema
from passlib.hash import pbkdf2_sha256
from db import db
# from utils.decorators import role_required

blp = Blueprint("Auth", __name__, url_prefix="/auth", description="User Authentication")

def create_user(user_data, required_type=None):
    """Shared user creation logic with validation"""
    user_type = required_type or user_data.get("user_type")
    
    # Validate if the user is already registered
    if UserModel.query.filter_by(email=user_data["email"]).first():
        abort(409, message="Email already registered")
    
    # Validate the role for the user type
    role = RoleModel.query.filter_by(role=user_type).first()
    if not role:
        abort(400, message=f"Invalid user type: {user_type}")

    # Create the user with the assigned role
    user = UserModel(
        email=user_data["email"],
        password=pbkdf2_sha256.hash(user_data["password"]),
        name=user_data["name"],
        phone_number=user_data["phone_number"],
        user_type=user_type,
        roles=[role],
        license_number=user_data.get("license_number"),
        company_id=user_data.get("company_id")
    )

    db.session.add(user)
    db.session.commit()
    return {"message": f"{user_type.capitalize()} created successfully"}, 201

@blp.route("/register")
class RegisterUser(MethodView):
    @blp.arguments(UserSchema)
    def post(self, user_data):
        """Unified registration with strict role-based creation restrictions"""
        user_type = user_data.get("user_type")

        # Customers can register themselves
        if user_type == "customer":
            if UserModel.query.filter_by(email=user_data["email"]).first():
                abort(409, message="Email already registered")
            return create_user(user_data, required_type=user_type)

        # Require authentication for admin and driver creation
        @jwt_required()
        def authenticated_registration():
            claims = get_jwt()
            current_user_roles = claims.get('roles', [])

            # Admins can create drivers
            if user_type == "driver":
                if "admin" not in current_user_roles:
                    abort(403, message="Only admin can create driver users")
                if not user_data.get("license_number"):
                    abort(400, message="License number required for driver")
                return create_user(user_data, required_type=user_type)

            # Super Admins can create Admins
            if user_type == "admin":
                if "super_admin" not in current_user_roles:
                    abort(403, message="Only super admin can create admin users")
                if not user_data.get("company_id"):
                    abort(400, message="Company ID required for admin")
                return create_user(user_data, required_type=user_type)

            abort(400, message="Invalid user type provided.")

        return authenticated_registration()


@blp.route('/login')
class AuthLogin(MethodView):
    @blp.arguments(LoginSchema)
    def post(self, login_data):
        user = UserModel.query.filter_by(email=login_data["email"]).first()
        
        if not user or not pbkdf2_sha256.verify(login_data["password"], user.password):
            abort(401, message="Invalid credentials")
        
        tokens = {
            "access_token": create_access_token(
                identity=str(user.id),
                additional_claims={
                    "roles": [r.role for r in user.roles],
                    "user_type": user.user_type
                }
            ),
            "refresh_token": create_refresh_token(identity=str(user.id)),
            "user_type": user.user_type
        }
        return tokens, 200

