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

# ===============================
# BusinessSchema
# ===============================

class BusinessUpdateSchema(Schema):
    name = fields.Str(required=False)
    description = fields.Str(required=False)
    timestamp = fields.DateTime(dump_only=True)  
    address = fields.Str(required=False)
    phone_number = fields.Str(required=False)
    email = fields.Email(required=False)

# ===============================
# AppointmentSchema
# ===============================
class AppointmentSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    business_id = fields.Int(required=True)
    service_id = fields.Int(required=True)
    date_time = fields.DateTime(required=True)
    timestamp = fields.DateTime(dump_only=True)  
    user = fields.Nested(UserSchema, dump_only=True) 
    business = fields.Nested(BusinessSchema, dump_only=True)

# ===============================
# AppointmentUpdateSchema
# ===============================

class AppointmentUpdateSchema(Schema):
    user_id = fields.Int(required=False)
    business_id = fields.Int(required=False)
    service_id = fields.Int(required=False)
    date_time = fields.DateTime(required=False)
    timestamp = fields.DateTime(dump_only=True)

# ===============================
# ServiceSchema
# ===============================

class ServiceSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str(required=False)
    price = fields.Float(required=True)
    business_id = fields.Int(required=True)
    category_id = fields.Int(required=True)  # Adding category_id for service
    timestamp = fields.DateTime(dump_only=True)  
    appointments = fields.List(fields.Nested(AppointmentSchema), dump_only=True)

class ServiceUpdateSchema(Schema):
    name = fields.Str(required=False)  # Not required for partial updates
    description = fields.Str(required=False)
    price = fields.Float(required=False)
    business_id = fields.Int(required=False)  # Can be updated, but not required
    category_id = fields.Int(required=False)  # Adding category_id for update
    is_active = fields.Bool(required=False)  # If you allow activating/deactivat


# ===============================
# CategorySchema
# ===============================

class CategorySchema(Schema):
    id = fields.Int(dump_only=True)
    category_name = fields.Str(required=False)
    timestamp = fields.DateTime(dump_only=True)
    services = fields.List(fields.Nested("ServiceSchema"), dump_only=True)