from flask.views import MethodView
from flask_smorest import Blueprint, abort
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token, create_refresh_token , jwt_required, get_jwt_identity, get_jwt
from db import db
from schemas import CompanySchema , CompanyLoginSchema , CompanyUpdateSchema
from models  import CompanyModel
from blocklist import BLOCKLIST
blp = Blueprint("Company", __name__, description="Operations on Copanies")


@blp.route("/register_company")
class CompanyRegister (MethodView):
    @blp.arguments(CompanySchema)
    def post(self, company_data):
        if CompanyModel.query.filter(CompanyModel.email == company_data["email"]).first():
            abort(409, message="A user with that company already exists.")

        company = CompanyModel (
            name=company_data["name"],
            email =company_data["email"],
            phone_number=company_data["phone_number"],
            address=company_data["address"],
            password=pbkdf2_sha256.hash(company_data["password"]),
            
        
        )
        db.session.add(company)
        db.session.commit()

        return {"message": "Company created successfully."}, 201


@blp.route("/login_company")
class CompanyLogin(MethodView):
    @blp.arguments(CompanyLoginSchema)
    def post(self, company_data):
        company = CompanyModel.query.filter(CompanyModel.email == company_data["email"]).first()
        if not company or not pbkdf2_sha256.verify(company_data["password"], company.password):
            abort(401, message="Invalid email or password.")
        
        access_token = create_access_token(identity=str(company.id))
        refresh_token = create_refresh_token(identity=str(company.id))
        return {"access_token": access_token, "refresh_token": refresh_token}, 200


@blp.route("/logout_company")
class CompanyLogout(MethodView):
    @jwt_required()
    def post(self):
        jti = get_jwt_identity()
        return {"message": "Successfully logged out."}, 200
    
@blp.route("/refresh")
class TokenRefresh(MethodView):
    @jwt_required(refresh=True)
    def post(self):
        jti = get_jwt()["jti"]
        if jti in BLOCKLIST:
            BLOCKLIST.remove(jti)
        access_token = create_access_token(identity=get_jwt_identity(), fresh=False)
        return {"access_token": access_token}, 200
    
    
@blp.route("/company/<int:company_id>")
class CompanyResource(MethodView):
    @blp.response(200, CompanySchema)
    def get(self, company_id):
        company = CompanyModel.query.get_or_404(company_id)
        return company
    
    @blp.arguments(CompanyUpdateSchema)
    @blp.response(200, CompanySchema)
    def put(self, company_data, company_id):
        company = CompanyModel.query.get_or_404(company_id)
        company.update(company_data)
        db.session.commit()
        return company
    
    @jwt_required()
    def delete(self, company_id):
        company = CompanyModel.query.get_or_404(company_id)
        db.session.delete(company)
        db.session.commit()
        return {"message": "Company deleted successfully."}, 200
    
    