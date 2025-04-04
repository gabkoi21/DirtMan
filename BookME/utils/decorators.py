from functools import wraps
from flask_jwt_extended import get_jwt_identity, get_jwt, verify_jwt_in_request , jwt_required
from flask_smorest import abort
from models import AppointmentModel

def role_required(*roles, check_owner=False):
    def decorator(fn):
        @wraps(fn)
        @jwt_required()  # ✅ This ensures get_jwt_identity() and get_jwt() will work
        def wrapper(*args, **kwargs):
            user_id = get_jwt_identity()
            user_roles = get_jwt().get("roles", [])

            print("User ID:", user_id)
            print("Roles:", user_roles)

            # ✅ Check if user has at least one required role
            if not any(role in user_roles for role in roles):
                abort(403, message="You do not have the necessary permissions to access this resource.")

            # ✅ Owner check
            if check_owner:
                appointment_id = kwargs.get('appointment_id')
                appointment = AppointmentModel.query.get_or_404(appointment_id)

                print("Appointment owner:", appointment.user_id)

                is_owner = str(user_id) == str(appointment.user_id)
                is_admin = "business_admin" in user_roles

                if not is_owner and not is_admin:
                    abort(403, message="You are not authorized to access this appointment.")

            return fn(*args, **kwargs)
        return wrapper
    return decorator
