from flask.views import MethodView
from flask_smorest import Blueprint, abort
from models import UserModel, RoleModel, BusinessModel
from passlib.hash import pbkdf2_sha256
from schemas import BusinessSchema, UserSchema ,BusinessUpdateSchema
from utils.decorators import role_required
from db import db

# Initialize the Blueprint for business-related routes
blp = Blueprint("Businesses", __name__, url_prefix="/business", description="Operations on businesses")


def create_business(business_data):
    """Helper function to create a new business."""
    if BusinessModel.query.filter_by(email=business_data["email"]).first():
        abort(409, message="A business with this email already exists.")
    
    if BusinessModel.query.filter_by(name=business_data["name"]).first():
        abort(409, message="A business with this name already exists.")
    
    # Validate required fields
    if not business_data.get('name') or not business_data.get('description'):
        abort(400, message="Business name and description are required.")
    
    # Create business instance
    business = BusinessModel(
        name=business_data['name'],
        description=business_data.get('description'),
        timestamp=business_data.get('timestamp'),
        address=business_data.get('address'),
        phone_number=business_data.get('phone_number'),
        email=business_data.get('email')
    )
    db.session.add(business)
    db.session.commit()
    return business


def create_admin_user(admin_data, business):
    """Helper function to create an admin user for a business."""
    if UserModel.query.filter_by(email=admin_data['email']).first():
        abort(409, message="A user with this email already exists.")
    
    admin_user = UserModel(
        email=admin_data['email'],
        password=pbkdf2_sha256.hash(admin_data['password']),
        first_name=admin_data['first_name'],
        last_name=admin_data['last_name'],
        phone_number=admin_data["phone_number"],
        user_type="business_admin",
        business=business  # Associate with the actual business object
    )
    
    admin_role = RoleModel.query.filter_by(role='business_admin').first()
    if not admin_role:
        abort(404, message="Admin role not found.")
    
    admin_user.roles.append(admin_role)
    db.session.add(admin_user)
    db.session.commit()
    return admin_user


@blp.route('/create')
class CreateBusiness(MethodView):
    @blp.arguments(BusinessSchema)
    @blp.response(201, BusinessSchema)
    @role_required('super_admin')
    def post(self, business_data):
        """Create a new business and assign an admin to it. Accessible only by Super Admin."""
        business = create_business(business_data)
        admin_data = business_data.get('admin_user')
        if not admin_data:
            abort(400, message="Admin user data must be provided.")
        create_admin_user(admin_data, business)
        return {"message": "Business and its Admin created successfully"}, 201


@blp.route('/<int:business_id>/add-admin')
class AddAdminToBusiness(MethodView):
    @blp.arguments(UserSchema)
    @blp.response(201, UserSchema)
    @role_required('super_admin')
    def post(self, user_data, business_id):
        """Add an admin to an existing business. Only accessible by Super Admin."""
        business = BusinessModel.query.get_or_404(business_id)
        admin_user = create_admin_user(user_data, business)
        return admin_user


@blp.route('/<int:business_id>')
class BusinessDetails(MethodView):
    @blp.response(200, BusinessSchema)
    @role_required('super_admin')
    def delete(self, business_id):
        """Delete a business and all associated users and roles. Only accessible by Super Admin."""
        business = BusinessModel.query.get_or_404(business_id)
        
        # Delete all users associated with the business
        users = UserModel.query.filter_by(business_id=business_id).all()
        for user in users:
            user.roles.clear()
            db.session.delete(user)
        
        db.session.delete(business)
        db.session.commit()
        
        return {"message": "Business and all associated users deleted successfully."}
    
@blp.route('/update/<int:business_id>')
class BusinessUpdateView(MethodView):
    @blp.arguments(BusinessUpdateSchema)
    @role_required('super_admin')
    def put(self, data, business_id):
        """Update a business. Only accessible by Super Admin."""
        business = BusinessModel.query.get_or_404(business_id)

        for key, value in data.items():
            if key == "password":
                hashed_password = pbkdf2_sha256.hash(value)
                setattr(business, key, hashed_password)
            else:
                setattr(business, key, value)

        db.session.add(business)  # Track changes
        db.session.commit()

        return {"message": "Business updated successfully."}



    



