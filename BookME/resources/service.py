from flask.views import MethodView
from flask_smorest import Blueprint
from flask import request, jsonify
from db import db
from models import ServiceModel
from schemas import ServiceSchema, ServiceUpdateSchema
from utils.decorators import role_required

blp = Blueprint("Services", __name__, url_prefix="/services", description="Operations on Services")

@blp.route("/")
class ServiceList(MethodView):
    @blp.response(200, ServiceSchema(many=True))
    def get(self):
        """Get all services (Allowed for all roles)"""
        return ServiceModel.query.all()

    @blp.arguments(ServiceSchema)
    @role_required('super_admin')
    def post(self, service_data):
        """Create a new service"""
        service = ServiceModel(**service_data)
        db.session.add(service)
        db.session.commit()
        return {"message": "Service created successfully."}, 201

@blp.route("/<int:service_id>")
class ServiceDetail(MethodView):
    @blp.response(200, ServiceSchema)
    def get(self, service_id):
        """Get details of a specific service"""
        return ServiceModel.query.get_or_404(service_id)

    @blp.arguments(ServiceUpdateSchema)
    # @blp.response(200, ServiceSchema)
    @role_required('super_admin')
    def put(self, service_data, service_id):
        """Update service details"""
        service = ServiceModel.query.get_or_404(service_id)

        for key, value in service_data.items():
            if value is not None:
                setattr(service, key, value)

        db.session.add(service)
        db.session.commit()
        return {"message": "Service updated successfully."}, 200

    
    def delete(self, service_id):
        """Delete a service"""
        service = ServiceModel.query.get_or_404(service_id)
        db.session.delete(service)
        db.session.commit()
        return {"message": "Service deleted successfully."}, 200
