from flask.views import MethodView
from flask_smorest import Blueprint, abort
from db import db
from schemas import RequestSchema, UserUpdateSchema
from  models import RequestModel
from blocklist import BLOCKLIST
from sqlalchemy.exc import SQLAlchemyError

blp = Blueprint("Requests", __name__, description="Operations on Requests")


@blp.route("/request")
class CreateRequest(MethodView):
    @blp.arguments(RequestSchema)
    def post(self, request_data):
        try:
            new_request = RequestModel(**request_data)
            db.session.add(new_request)
            db.session.commit()
            return {"message": "Request created successfully."}, 201
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(500, description=f"Database error: {str(e)}")

    def get(self):
    
        try:
            requests = RequestModel.query.all()
            return RequestSchema(many=True).dump(requests), 200
        except SQLAlchemyError as e:
            abort(500, description=f"Database error: {str(e)}")


@blp.route("/request/<int:request_id>")
class RequestResource(MethodView):
    @blp.response(200, RequestSchema)
    def get(self, request_id):
    
        try:
            request = RequestModel.query.get(request_id)
            if not request:
                abort(404, description="Request not found.")
            return request
        except SQLAlchemyError as e:
            abort(500, description=f"Database error: {str(e)}")

    @blp.arguments(UserUpdateSchema)
    @blp.response(200, RequestSchema)
    def put(self, request_data, request_id):
        try:
            request = RequestModel.query.get(request_id)
            if not request:
                abort(404, description="Request not found.")

            if request.user_id != request_data.get("user_id"):
                abort(403, description="You are not authorized to update this request.")

            for key, value in request_data.items():
                setattr(request, key, value) 
            
            db.session.commit()
            return request
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(500, description=f"Database error: {str(e)}")

    def delete(self, request_id):
        try:
            request = RequestModel.query.get(request_id)
            if not request:
                abort(404, description="Request not found.")

            if request.user_id in BLOCKLIST:  
                abort(403, description="You are not authorized to delete this request.")
            
            db.session.delete(request)
            db.session.commit()
            return {"message": "Request deleted successfully."}, 204
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(500, description=f"Database error: {str(e)}")
