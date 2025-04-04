from flask.views import MethodView
from flask_smorest import Blueprint, abort
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import  jwt_required, get_jwt
from db import db
from models import UserModel 
from sqlalchemy.exc import OperationalError
from schemas import UserSchema, UserupdateSchema 
from utils.decorators import role_required

blp = Blueprint("User", __name__, url_prefix="/auth", description="Operations on User Model models")


@blp.route("/<int:user_id>")
class ManageUser(MethodView):
    @jwt_required()
    @blp.arguments(UserupdateSchema (partial=True))
    def put(self, user_data, user_id):
        """Update user details (customer, business_admin)"""
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
            if user.user_type == "business_admin" and "super_admin" in current_user_roles:
                return {"message": "User deleted successfully"}, 200
            
        except OperationalError:
            return {"message": "Database error occurred"}, 500

    @jwt_required()
    def delete(self, user_id):
        """Delete a specific user (customer, business_admin)"""
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
        
        """Get a specific user (customer,  business_admin)"""
        try:
            user =  UserModel.query.get_or_404(user_id)
            return user
        
        except OperationalError:
            return {"message": "Can not find user with this id in the database"}, 500