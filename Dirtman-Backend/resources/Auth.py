from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt
from models import UserModel, RoleModel
from schemas import UserSchema, LoginSchema , UserUpdateSchema
from sqlalchemy.exc import OperationalError
from passlib.hash import pbkdf2_sha256
from db import db

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

        if user_type == "customer":
            return create_user(user_data, required_type="customer")
        
        elif user_type == "super_admin":
            return create_user(user_data, required_type="super_admin")
        
        return self.register_with_auth(user_data, user_type)

    @jwt_required()  
    def register_with_auth(self, user_data, user_type):
        """Handles authenticated user registration (Admin & Driver)"""
        claims = get_jwt()
        current_user_roles = claims.get("roles", [])

        if user_type == "driver":
            if "admin" not in current_user_roles:
                abort(403, message="Only admin can create driver users")
            if not user_data.get("license_number"):
                abort(400, message="License number required for driver")
            return create_user(user_data, required_type="driver")

        if user_type == "admin":
            if "super_admin" not in current_user_roles:
                abort(403, message="Only super admin can create admin users")
            if not user_data.get("company_id"):
                abort(400, message="Company ID required for admin")
            return create_user(user_data, required_type="admin")

        abort(400, message="Invalid user type provided.")


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



# This is to get user on id 
@blp.route("/user/<int:user_id>")
class ManageUser(MethodView):
    @jwt_required()
    @blp.arguments(UserUpdateSchema(partial=True))
    def put(self, user_data, user_id):
        """Update user details (customer, driver, admin)"""
        claims = get_jwt()
        current_user_roles = claims.get("roles", [])
        current_user_id = claims.get("sub")

        user = UserModel.query.get_or_404(user_id, description="User not found")
        
        # Authorization check
        if not self.is_authorized(user, current_user_id, current_user_roles):
            abort(403, message="Unauthorized to update this user")

        # Update fields and hash password if necessary
        for key, value in user_data.items():
            if key == "password":
                hashed_password = pbkdf2_sha256.hash(value)
                setattr(user, key, hashed_password)
            else:
                setattr(user, key, value)

        db.session.commit()
        return {"message": "User updated successfully"}, 200

    def is_authorized(self, user, current_user_id, current_user_roles):
        """Checks if the user has permission to update the profile"""
        try:
            if str(user.id) == current_user_id:
                return {"message": "User deleted successfully"}, 200
            if user.user_type == "driver" and "admin" in current_user_roles:
                return {"message": "User deleted successfully"}, 200
            if user.user_type == "admin" and "super_admin" in current_user_roles:
                return {"message": "User deleted successfully"}, 200
            
        except OperationalError:
            return {"message": "Database error occurred"}, 500

    @jwt_required()
    def delete(self, user_id):
        """Delete a specific user (customer, driver, admin)"""
        try:
            claims = get_jwt()
            current_user_roles = claims.get("roles", [])
            current_user_id = claims.get("sub")
            
            # if current_user is not None and current_user 
            user = UserModel.query.get_or_404(user_id, description="User not found")
            
            # Authorization check
            if not self.is_authorized(user, current_user_id, current_user_roles):
                abort(403, message="Unauthorized to delete this user")
            
            db.session.delete(user)
            db.session.commit()
            return {"message": "User deleted successfully"}, 200
        
        except OperationalError:
            return {"message": "Database error occurred"}, 500
    

    @blp.response(200, UserSchema)
    def get(self, user_id):
        
        """Get a specific user (customer, driver, admin)"""
        try:
            user =  UserModel.query.get_or_404(user_id)
            return user
        
        except OperationalError:
            return {"message": "Can not find user with this id in the database"}, 500