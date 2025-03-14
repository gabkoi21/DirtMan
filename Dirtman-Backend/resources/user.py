from flask.views import MethodView
from flask_smorest import Blueprint, abort
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token, create_refresh_token , jwt_required, get_jwt_identity, get_jwt
from db import db
from schemas import UserSchema
from schemas import UserUpdateSchema
from schemas import UserLoginSchema
from models import UserModel
from blocklist import BLOCKLIST
blp = Blueprint("Users", __name__, description="Operations on users")

@blp.route("/register")
class UserRegister(MethodView):
    @blp.arguments(UserSchema)
    def post(self, user_data):
        if UserModel.query.filter(UserModel.email == user_data["email"]).first():
            abort(409, message="A user with that user already exists.")

        user = UserModel(
            email=user_data["email"],
            password=pbkdf2_sha256.hash(user_data["password"]),
            firstname=user_data["firstname"],
            lastname=user_data['lastname'],
            address=user_data["address"],
            company_id= user_data["company_id"] 
        )
        db.session.add(user)
        db.session.commit()

        return {"message": "User created successfully."}, 201
    
    
    @blp.arguments(UserSchema)
    def get(self, user_data):
        users = UserModel.query.all()
        return UserSchema(many=True).dump(users)

        
@blp.route("/login")
class UserLogin(MethodView):
    @blp.arguments(UserLoginSchema)
    def post(self, user_data):
        user = UserModel.query.filter(UserModel.email == user_data["email"]).first()
        if not user or not pbkdf2_sha256.verify(user_data["password"], user.password):
            abort(401, message="Invalid credentials")
        
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))
        return {"access_token": access_token, "refresh_token": refresh_token}, 200
    
    
@blp.route("/logout")
class userLogout(MethodView):
    @jwt_required()
    def post(self):
        jti = get_jwt_identity()
        BLOCKLIST.add(jti)
        return {"message": "Successfully logged out."}, 200
    
    
@blp.route("/refresh")
class UserRefresh(MethodView):
    @jwt_required(refresh=True)
    def post(self):
        jti = get_jwt_identity()
        access_token = create_access_token(identity=jti, fresh=False)
        jti = get_jwt()["jti"]
        BLOCKLIST.add(jti)
        return {"access_token": access_token}, 200
    
@blp.route("/delete_all")
class DeleteAllUsers(MethodView):
    def delete(self):
        users = UserModel.query.all()
        for user in users:
            db.session.delete(user)
        db.session.commit()
        return {"message": "All users deleted successfully."}, 200
    
    
    
    
    
@blp.route("/user/<int:user_id>")
class user(MethodView):
    @blp.response(200, UserSchema)
    def get(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        return user
    
    @blp.arguments(UserUpdateSchema)
    @blp.response(200, UserSchema)
    def put(self, user_data, user_id):
        user = UserModel.query.get_or_404(user_id)
        user.email = user_data["email"]
        user.firstname = user_data["firstname"]
        user.lastname = user_data["lastname"]
        db.session.commit() 
        return user
    
    @blp.response(204)
    def delete(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted successfully."}, 201


