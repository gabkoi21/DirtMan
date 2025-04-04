# from functools import wraps
# from flask import jsonify, request
# from models import UserModel

# def role_required(*roles):
#     def decorator(f):
#         @wraps(f)
#         def wrapper(*args, **kwargs):
#             user_role = request.headers.get("X-User-Role", None)
#             if user_role not in roles:
#                 return jsonify({"message": "Access denied"}), 403
#             return f(*args, **kwargs)
#         return wrapper
#     return decorator


# utils/decorators.py
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