from datetime import datetime
from db import db
from models.associations import user_roles  # Ensure this is imported

class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)  # ✅ Correct Unique Constraint
    email = db.Column(db.String(100), unique=True, nullable=False)  # ✅ Correct Unique Constraint
    password = db.Column(db.String(100), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id', name='fk_user_company'), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.now)

    roles = db.relationship("RoleModel", secondary=user_roles, back_populates="users")  
