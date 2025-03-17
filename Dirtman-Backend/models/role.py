from datetime import datetime
from db import db
from models.associations import user_roles

class RoleModel(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(50), unique=True, nullable=False)  # ✅ Correct Unique Constraint
    timestamp = db.Column(db.DateTime, default=datetime.now)

    users = db.relationship("UserModel", secondary=user_roles, back_populates="roles")  
