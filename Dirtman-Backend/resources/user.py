from flask.views import MethodView
from flask_smorest import Blueprint, abort
from models import UserModel, RoleModel, CompanyModel 
from schemas import UserSchema
from passlib.hash import pbkdf2_sha256 
from flask_jwt_extended import create_access_token
from utils.decorators import role_required
from datetime import timedelta
from db import db


blp = Blueprint("Users", __name__, url_prefix="/users", description="Operations on users")


@blp.route("/register")
def UserRegister(MethodView):
    @blp.arguments(UserSchema)
    def post(self, user_data):
        if UserModel.query.filter(UserModel.email == user_data.email["email"]).first():
            abort(409, message="A User with this email already exists.")
            
            
            user = UserModel(
                email=user_data.email["email"],
                password=pbkdf2_sha256.hash(user_data["password"]),
                name=user_data.name["name"],
                roles=[RoleModel.query.get_or_404(1)],
                conpany_id=user_data.conpany_id["conpany_id"],
            )
            db.session.add(user)
            db.session.commit()
            
            return {"Message": "User created successfully"},201
        

@blp.route('/login')
class Login(MethodView):
    @blp.arguments(UserSchema)
    @blp.response(200, UserSchema)
    def post(self, user_data):
        user = UserModel.query.filter_by(email=user_data.email["email"]).first()
        
        if not user or not pbkdf2_sha256.verify(user_data["password"], user.password):
            abort(401, message="Invalid email or password.")
            
            
        access_token = create_access_token(identity=user.id, expires_delta=timedelta(days=30))
        return {"access_token": access_token}, 200
    
    
        abort(401, message="Invalid credential.")  
        
        
        
@blp.route("/<int:user_id>")
class user(MethodView):
    @blp.response(200, UserSchema)
    def get(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        return user
    
    def delete(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {"Message": "User deleted successfully"}, 204














