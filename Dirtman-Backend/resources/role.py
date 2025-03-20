from flask.views import MethodView
from flask_smorest import Blueprint
from db import db
from models import RoleModel
from schemas import RoleSchema
from utils.decorators import role_required

# Initialize the Blueprint for role-related routes
blp = Blueprint("Role", __name__, url_prefix="/roles", description="Operations on role models")

@blp.route('/')
class RoleList(MethodView):
    @blp.response(200, RoleSchema(many=True))
    def get(self):
        """Retrieve all roles."""
        return RoleModel.query.all()
    
    @blp.arguments(RoleSchema)
    @blp.response(201, RoleSchema)
    @role_required('super_admin') 
    def post(self, role_data):
        """Create a new role."""
        role = RoleModel(role=role_data["role"])
        db.session.add(role)
        db.session.commit()
        return role

@blp.route('/<int:role_id>')
class RoleResource(MethodView):
    @blp.response(200, RoleSchema)
    def get(self, role_id):
        """Get a specific role by ID."""
        role = RoleModel.query.get_or_404(role_id)
        return role

    @blp.arguments(RoleSchema)
    @blp.response(200, RoleSchema)
    @role_required('super_admin')
    def put(self, role_data, role_id):
        """Update an existing role."""
        role = RoleModel.query.get_or_404(role_id)
        role.role = role_data["role"]
        db.session.commit()
        return role

    @blp.response(200, {"message": str})
    @role_required('super_admin')
    def delete(self, role_id):
        """Delete a specific role by ID."""
        role = RoleModel.query.get_or_404(role_id)
        db.session.delete(role)
        db.session.commit()
        return {"message": "Role deleted successfully."}