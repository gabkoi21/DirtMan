from flask.views import MethodView
from flask_smorest import Blueprint, abort
from models import UserModel, RoleModel, CompanyModel
from schemas import UserSchema
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from utils.decorators import role_required
from datetime import timedelta
from db import db



blp = Blueprint("Customers", __name__, url_prefix="/customers", description="Operations for Customers")

@blp.route("/register")
class CustomerRegister(MethodView):
    @blp.arguments(UserSchema)
    def post(self, user_data):
        if UserModel.query.filter(UserModel.email == user_data["email"]).first():
            abort(409, message="A User with this email already exists.")

        # Create Customer user
        user = UserModel(
            email=user_data["email"],
            password=pbkdf2_sha256.hash(user_data["password"]),
            name=user_data["name"],
            roles=[RoleModel.query.filter_by(role='customer').first()],
            company_id=user_data["company_id"],
        )
        db.session.add(user)
        db.session.commit()

        return {"Message": "Customer created successfully"}, 201

@blp.route("/login")
class CustomerLogin(MethodView):
    @blp.arguments(UserSchema)
    def post(self, user_data):
        user = UserModel.query.filter_by(email=user_data["email"]).first()
        if not user or not pbkdf2_sha256.verify(user_data["password"], user.password):
            abort(401, message="Invalid email or password.")

        # Check if the user is a Customer
        if not any(role.role == 'customer' for role in user.roles):
            abort(403, message="You do not have permission to access this resource.")

        access_token = create_access_token(identity=user.id, expires_delta=timedelta(days=30))
        return {"access_token": access_token}, 200