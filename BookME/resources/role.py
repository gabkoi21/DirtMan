from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import jwt_required
from db import db
from models import RoleModel
from schemas import RoleSchema
from utils.decorators import role_required

blp = Blueprint("Role", __name__, url_prefix="/roles", description="Operations on role models")


@blp.route("/")
class RoleList(MethodView):
    @blp.response(200, RoleSchema(many=True))
    @jwt_required()
    @role_required("super_admin")
    def get(self):
        """Get all roles"""
        return RoleModel.query.all()

    @blp.arguments(RoleSchema)
    @jwt_required()
    @role_required("super_admin")
    def post(self, role_data):
        """Create a new role this is """
        role = RoleModel(**role_data)
        db.session.add(role)
        db.session.commit()
        return {"message": "Role created successfully."}, 201


@blp.route("/<int:role_id>")
class Role(MethodView):
    @blp.response(200, RoleSchema)
    @jwt_required()
    @role_required("super_admin")
    def get(self, role_id):
        """Get a role by ID"""
        role = RoleModel.query.get_or_404(role_id)
        return role

    @blp.arguments(RoleSchema)
    @jwt_required()
    @role_required("super_admin")
    def put(self, role_data, role_id):
        """Update a role by ID"""
        role = RoleModel.query.get_or_404(role_id)
        for key, value in role_data.items():
            setattr(role, key, value)
        db.session.commit()
        return {"message": "Role updated successfully."}, 200

    @jwt_required()
    @role_required("super_admin")
    def delete(self, role_id):
        """Delete a role by ID"""
        role = RoleModel.query.get_or_404(role_id)
        db.session.delete(role)
        db.session.commit()
        return {"message": "Role deleted successfully."}, 200