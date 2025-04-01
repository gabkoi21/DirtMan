# models/role.py
from db import db
from datetime import datetime
from models.associations import user_roles

class RoleModel(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(50), unique=True, nullable=False)  # Add this line
    timestamp = db.Column(db.DateTime, default=datetime.now)

    # Relationships
    users = db.relationship('UserModel', secondary='user_roles', back_populates='roles')

