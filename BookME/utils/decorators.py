from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from flask_smorest import abort

def role_required(role_name):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()  # Get claims from JWT
            if role_name not in claims.get('roles', []):  # Safe access with .get()
                abort(403, message=f"Role '{role_name}' is required.")
            return fn(*args, **kwargs)
        return wrapper
    return decorator
