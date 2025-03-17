from marshmallow import Schema, fields 

# Role Schema (for handling roles in API requests and responses)
class RoleSchema(Schema):
    id = fields.Int(dump_only=True)
    role = fields.String(required=True)
    timestamp = fields.DateTime(required=True)

# User Schema (for handling user-related data)
class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
    company_id = fields.Int(required=False)
    roles = fields.Nested(RoleSchema, many=True)  # Include the roles in the response
    
    
# Login Schema (for handling login requests)
class LoginSchema(Schema):
    email = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
   


# Company Schema (for handling company-related data and the admin user)
class CompanySchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    admin_user = fields.Nested(UserSchema, required=True)  # Admin user details
