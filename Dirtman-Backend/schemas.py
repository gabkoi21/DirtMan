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
    name = fields.String(required=True)
    email = fields.String(required=True)
    password = fields.String(required=True, load_only=True)
    phone_number = fields.String(required=True)
    user_type = fields.String(required=True) 
    company_id = fields.Integer(allow_none=True)
    license_number = fields.String(allow_none=True) 
    
    

# ==============================
# User Schema to update (Base for All Users)
# ==============================
class UserUpdateSchema(Schema):
    name = fields.Str()
    phone_number = fields.Str()
    license_number = fields.Str()
    company_id = fields.Int()
    password = fields.String(load_only=True)

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


class CompanySchema(Schema):
    """Schema for handling company-related data, including the admin user."""
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    timestamp = fields.DateTime(required=True)
    admin_user = fields.Nested(UserSchema, required=True)



class ScheduleSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    company_id = fields.Int(required=True)
    start_time = fields.DateTime(required=True)
    end_time = fields.DateTime(required=True)
    status = fields.Str(required=True)
    timestamp = fields.DateTime(required=True)