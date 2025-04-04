from flask.views import MethodView
from flask_smorest import Blueprint, abort
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt
from db import db
from models import UserModel, RoleModel, BusinessModel
from sqlalchemy.exc import OperationalError
from schemas import UserSchema, UserLoginSchema
from utils.decorators import role_required


# Initialize the Blueprint for authentication-related routes
blp = Blueprint("Auth", __name__, url_prefix="/auth", description="Operations on auth models")


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

    # Check if the business exists O
    if user_data.get("role") != "super_admin":
        if not user_data.get("business_id"):
            abort(400, message="Business ID is required for non-super-admin users.")
            
        business = BusinessModel.query.filter_by(id=user_data["business_id"]).first()

        if not business:
            abort(400, message="Business does not exist. Please choose a valid business.")



    # Create the user with the assigned role
    user = UserModel(
        first_name=user_data["first_name"],
        last_name=user_data["last_name"],
        email=user_data["email"],
        phone_number=user_data["phone_number"],
        user_type=user_type,
        address=user_data.get("address"),
        business_id=user_data.get("business_id"),
        password=pbkdf2_sha256.hash(user_data["password"]),  
        roles=[role],  
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

        if user_type in ["customer", "super_admin"]:
            return create_user(user_data, required_type=user_type)

        return self.register_with_auth(user_data, user_type)

    @jwt_required()  
    def register_with_auth(self, user_data, user_type):
        """Handles authenticated user registration (Admin & Driver)"""
        claims = get_jwt()
        current_user_roles = claims.get("roles", [])

        if user_type == "business_admin":
            if "super_admin" not in current_user_roles:
                abort(403, message="Only super admin can create business admin users")
            if not user_data.get("business_id"):
                abort(400, message="Company ID required for admin")
            return create_user(user_data, required_type="business_admin")

        abort(400, message="Invalid user type provided.")


@blp.route('/login')
class AuthLogin(MethodView):
    @blp.arguments(UserLoginSchema)
    def post(self, login_data):
        """Login user and return access and refresh tokens"""
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
