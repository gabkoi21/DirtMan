from marshmallow import Schema, fields


# ==============================
# Role Schema
# ==============================
class RoleSchema(Schema):
    id = fields.Int(dump_only=True)
    role = fields.Str(required=True)
    timestamp = fields.DateTime(required=True)


# ==============================
# User Schema (Base for All Users)
# ==============================
class UserSchema(Schema):
    """Schema for handling user-related data."""
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
    phone_number = fields.Str(required=True)
    user_type = fields.Str(required=True)  # Can be "user", "admin", or "driver"
    company_id = fields.Int(required=False)
    license_number = fields.Str(required=False)  # ✅ Add this field for drivers
    roles = fields.Nested("RoleSchema", many=True, dump_only=True)


# ==============================
# Extended Schema for Drivers
# ==============================
class DriverSchema(UserSchema):
    """Schema for handling driver-related data (inherits from UserSchema)."""
    license_number = fields.Str(required=True)


# ==============================
# Login Schema (For All Users)
# ==============================
class LoginSchema(Schema):
    """Schema for user login requests."""
    email = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
    

class DriverLoginSchema(Schema):
    """Schema for user login requests."""
    email = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)


# ==============================
# Company Schema
# ==============================
class CompanySchema(Schema):
    """Schema for handling company-related data, including the admin user."""
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    admin_user = fields.Nested(UserSchema, required=True)  # Admin user details
