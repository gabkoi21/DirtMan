from flask.views import MethodView
from flask_smorest import Blueprint, abort
from models import ScheduleModel
from schemas import ScheduleSchema
from db import db

# Initialize the Blueprint for company-related routes
blp = Blueprint("schedule", __name__, url_prefix="/schedule", description="Operations on schedules")


@blp.route("/create")
class CreateSchedule(MethodView):
    @blp.arguments(ScheduleSchema)
    @blp.response(201, ScheduleSchema)
    def post(self , seheduleData):
        try:
            schedule = ScheduleModel( **seheduleData)
            db.session.add(schedule)
            db.session.commit()
            return schedule
        
        except Exception:
            return{"message": "Error creating schedule"}
        