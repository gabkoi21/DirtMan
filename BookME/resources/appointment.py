from flask import request
from flask import Flask, request, jsonify
from flask_smorest import abort, Blueprint
from flask_jwt_extended import get_jwt, get_jwt_identity , jwt_required
from models import AppointmentModel , ServiceModel
from schemas import AppointmentSchema, AppointmentUpdateSchema
from db import db
from flask.views import MethodView
from utils.decorators import role_required

blp = Blueprint("Appointment", __name__, url_prefix="/appointment", description="Operations on Appointments")


@blp.route("/")
class AppointmentList(MethodView):
    @blp.response(200, AppointmentSchema(many=True))
    @role_required("business_admin")  # ✅ handles JWT check
    def get(self):
        """Get all appointments for the authenticated business."""
        business_id = get_jwt()["business_id"]
        appointments = AppointmentModel.query.filter_by(business_id=business_id).all()
        return appointments

    @blp.arguments(AppointmentSchema)
    @blp.response(201, AppointmentSchema)
    @role_required("customer")  # ✅ this alone is enough
    def post(self, appointment_data):
        if not ServiceModel.query.get(request.get_json().get('service_id')):
            abort(404, message="Service not found. Please create the service first before scheduling an appointment.")
        
        user_id = get_jwt_identity()
        appointment_data["user_id"] = user_id

        appointment = AppointmentModel(**appointment_data)
        db.session.add(appointment)
        db.session.commit()
        return appointment


@blp.route("/<int:appointment_id>")
class Appointment(MethodView):
    @blp.response(200, AppointmentSchema)
    @role_required("business_admin", "customer", check_owner=True)
    def get(self, appointment_id):
        """Get a specific appointment by ID."""
        appointment = AppointmentModel.query.get_or_404(appointment_id)
        return appointment

    @blp.arguments(AppointmentUpdateSchema)
    @blp.response(200, AppointmentSchema)
    @jwt_required()
    @role_required("business_admin", "customer", check_owner=True)
    def put(self, appointment_data, appointment_id):
        if not ServiceModel.query.get(request.get_json().get('service_id')):
            abort(404, message="Service not found. Please create the service first before scheduling an appointment.")

        appointment = AppointmentModel.query.get_or_404(appointment_id)

        for key, value in appointment_data.items():
            if key != "user_id":
                setattr(appointment, key, value)

        db.session.commit()
        return appointment

    @blp.response(204)
    @role_required("business_admin", "customer", check_owner=True)
    def delete(self, appointment_id):
        """Delete a specific appointment by ID."""
        appointment = AppointmentModel.query.get_or_404(appointment_id)

        db.session.delete(appointment)
        db.session.commit()
        return {"message": "Appointment deleted successfully."}, 204