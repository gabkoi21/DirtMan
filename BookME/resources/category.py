from flask.views import MethodView
from flask_smorest import Blueprint, abort
from models import CategoryModel
from schemas import CategorySchema
from utils.decorators import role_required
from db import db

blp = Blueprint("Categories", __name__, url_prefix="/category", description="Operations on Categories")

# Define a route for all categories
@blp.route("/")
class Category(MethodView):
    @blp.response(200, CategorySchema(many=True))
    def get(self):
        """Get all categories."""
        return CategoryModel.query.all()

    @blp.arguments(CategorySchema)
    @blp.response(201, CategorySchema)
    @role_required('super_admin')
    def post(self, category_data):
        """Create a new category."""
        category = CategoryModel(**category_data) 
        db.session.add(category)
        db.session.commit()

        return category


@blp.route("/<int:category_id>")
class CategoryById(MethodView):
    @blp.response(200, CategorySchema)
    def get(self, category_id):
        """Get a category by ID."""
        category = CategoryModel.query.get_or_404(category_id)
        return category

    @blp.arguments(CategorySchema)
    @blp.response(200, CategorySchema)
    @role_required('super_admin')
    def put(self, category_data, category_id):
        """Update a category by ID."""
        category = CategoryModel.query.get_or_404(category_id)
        for key, value in category_data.items():
            setattr(category, key, value)
        
        db.session.add(category)
        db.session.commit()
        return category
    
    @blp.response(200, CategorySchema)
    @role_required('super_admin')
    def delete(self, category_id):
        """Delete a category by ID."""
        category = CategoryModel.query.get_or_404(category_id)
        db.session.delete(category)
        db.session.commit()
        return {"message": "Category deleted successfully."}
