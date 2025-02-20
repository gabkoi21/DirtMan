from marshmallow import Schema, fields

# User Schema
class UserSchema(Schema):
    email = fields.Str(required=True)
    password = fields.Str(required=True)
    firstname = fields.Str(required=True)
    lastname = fields.Str(required=True)
    address = fields.Str(required=True)
    company_id = fields.Int(required=True)
    timestamp = fields.DateTime()
    
    # Relationship with requests (Lazy evaluation to avoid reference issues)
    requests = fields.List(fields.Nested(lambda: RequestSchema()), dump_only=True)
    # company = fields.Nested(lambda: CompanySchema(), dump_only=True) 
    company = fields.List(fields.Nested(lambda: CompanySchema()), dump_only=True) 


# User Update Schema
class UserUpdateSchema(Schema):
    username = fields.Str()
    firstname = fields.Str()
    lastname = fields.Str()
    address = fields.Str()

# User Login Schema
class UserLoginSchema(Schema):
    email = fields.Email(required=True)  # Changed from username to email
    password = fields.Str(required=True)

# Company Schema
class CompanySchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    address = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True)
    phone_number = fields.Str(required=True)
    timestamp = fields.DateTime()

# Company Login Schema
class CompanyLoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)

# Company Update Schema
class CompanyUpdateSchema(Schema):
    name = fields.Str()
    address = fields.Str()
    email = fields.Email()
    password = fields.Str()
    phone_number = fields.Str()
    timestamp = fields.DateTime()

# Request Schema
class RequestSchema(Schema):
    id = fields.Int(dump_only=True)
    waste_type = fields.Str(required=True)
    date = fields.Str(required=True)
    time = fields.Str(required=True)
    user_id = fields.Int(required=True)
    timestamp = fields.DateTime()

# Request Update Schema
class RequestUpdateSchema(Schema):
    waste_type = fields.Str()
    date = fields.Str()
    time = fields.Str()
    user_id = fields.Int()
    timestamp = fields.DateTime()
