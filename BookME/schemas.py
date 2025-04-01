from marshmallow import Schema, fields

# ==============================
# Role Schema
# ==============================
class RoleSchema(Schema):
    id = fields.Int(dump_only=True)
    role = fields.Str(required=True)
    timestamp = fields.DateTime(required=True)  

# ==============================
# User Schema
# ==============================

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(load_only=True, required=True)
    business_id = fields.Integer(required=False, allow_none=True)
    user_type = fields.Str(required=True, default="user")
    phone_number = fields.Str(required=True)
    address = fields.Str(required=False)
    timestamp = fields.DateTime(dump_only=True)  
    roles = fields.List(fields.Nested(RoleSchema), dump_only=True) 

# ==============================
# User Update Schema
# ==============================

class UserupdateSchema(Schema):
    first_name = fields.Str(required=False)
    last_name = fields.Str(required=False)
    email = fields.Email(required=False)
    password = fields.Str(load_only=True, required=False)
    business_id = fields.Integer(required=False, allow_none=True)
    address = fields.Str(required=False)
    timestamp = fields.DateTime(dump_only=True)
    user_type = fields.Str(required=False)
    phone_number = fields.Str(required=False)

# ==============================
# User Login Schema
# ==============================

class UserLoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(load_only=True, required=True)
    
# ==============================
# Business Schema
# ==============================

class BusinessSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    timestamp = fields.DateTime(dump_only=True)  
    users = fields.List(fields.Nested(UserSchema), dump_only=True) 
    admin_user = fields.Nested(UserSchema, required=True)
    address = fields.Str(required=False)
    phone_number = fields.Str(required=False)
    email = fields.Email(required=False)

class BusinessUpdateSchema(Schema):
    name = fields.Str(required=False)
    description = fields.Str(required=False)
    timestamp = fields.DateTime(dump_only=True)  
    address = fields.Str(required=False)
    phone_number = fields.Str(required=False)
    email = fields.Email(required=False)
