from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import jwt_required
from db import db
from models import RoleModel
from schemas import RoleSchema
from utils.decorators import role_required

blp = Blueprint("Role", __name__, url_prefix="/roles", description="Operations on role models")

@blp.route('/')
class RoleList(MethodView):
    @jwt_required()
    @blp.response(200, RoleSchema(many=True))
    def get(self):
        """Retrieve all roles (Authenticated Users Only)"""
        return RoleModel.query.all()
    
    
    @jwt_required()
    @blp.arguments(RoleSchema)
    @blp.response(201, RoleSchema)
    @role_required('super_admin')  
    def post(self, role_data):
        """Create a new role (Super Admin only)"""
        role = RoleModel(role=role_data["role"])
        db.session.add(role)
        db.session.commit()
        return role

@blp.route('/<int:role_id>')
class RoleResource(MethodView):
    @jwt_required()
    @blp.response(200, RoleSchema)
    def get(self, role_id):
        """Get a specific role by ID (Authenticated Users Only)"""
        role = RoleModel.query.get_or_404(role_id)
        return role

    @jwt_required()
    @blp.arguments(RoleSchema)
    @blp.response(200, RoleSchema)
    @role_required('super_admin')
    def put(self, role_data, role_id):
        """Update an existing role (Super Admin only)"""
        role = RoleModel.query.get_or_404(role_id)
        role.role = role_data["role"]
        db.session.commit()
        return role

    @jwt_required()
    @blp.response(200, {"message": str})
    @role_required('super_admin')
    def delete(self, role_id):
        """Delete a specific role (Super Admin only)"""
        role = RoleModel.query.get_or_404(role_id)
        db.session.delete(role)
        db.session.commit()
        return {"message": "Role deleted successfully."}