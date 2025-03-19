from flask.views import MethodView
from flask_smorest import Blueprint, abort
from models import CompanyModel, RoleModel , UserModel
from passlib.hash import pbkdf2_sha256
from schemas import DriverSchema, DriverLoginSchema
from flask_jwt_extended import create_access_token, create_refresh_token
from utils.decorators import role_required
from db import db

# Initialize the Blueprint for driver-related routes
blp = Blueprint("Drivers", __name__, url_prefix="/driver", description="Operations on driver models")


@blp.route('/register')
class DriverRegister(MethodView):
    @blp.arguments(DriverSchema)
    @blp.response(201, DriverSchema)
    @role_required('admin')  # Only Admins can register drivers
    def post(self, driver_data):
        if UserModel.query.filter_by(email=driver_data["email"]).first():
            abort(409, message="A user with this email already exists.")

        if UserModel.query.filter_by(license_number=driver_data["license_number"]).first():
            abort(409, message="A driver with this license number already exists.")

        company = CompanyModel.query.get(driver_data["company_id"])
        if not company:
            abort(404, message="Company not found.")

        driver_role = RoleModel.query.filter_by(role="driver").first()
        if not driver_role:
            abort(500, message="Driver role not found in the system. Contact Super Admin.")

        driver = UserModel(
            email=driver_data["email"],
            password=pbkdf2_sha256.hash(driver_data["password"]),
            name=driver_data["name"],
            company_id=driver_data["company_id"],
            license_number=driver_data["license_number"],
            phone_number=driver_data["phone_number"],
            user_type="driver",  # ✅ Set user type as "driver"
        )

        driver.roles.append(driver_role)
        db.session.add(driver)
        db.session.commit()

        return driver, 201  # Return the created driver


@blp.route('/login')
class DriverLogin(MethodView):
    @blp.arguments(DriverLoginSchema)
    def post(self, driver_data):
        driver = UserModel.query.filter_by(email=driver_data["email"], user_type="driver").first()

        # Validate email and password
        if not driver or not pbkdf2_sha256.verify(driver_data["password"], driver.password):
            abort(401, message="Invalid email or password.")

        # Ensure the driver has the "driver" role
        if "driver" not in [role.role for role in driver.roles]:
            abort(403, message="You are not authorized to log in as a driver.")

        # Assign roles to the token claims
        additional_claims = {
            "roles": [role.role for role in driver.roles]  # Ensure role claims exist
        }

        # Generate access and refresh tokens
        access_token = create_access_token(identity=str(driver.id), additional_claims=additional_claims)
        refresh_token = create_refresh_token(identity=str(driver.id))

        return {"access_token": access_token, "refresh_token": refresh_token}, 200

