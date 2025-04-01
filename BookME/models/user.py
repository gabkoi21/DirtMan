from db import db
from datetime import datetime
from models.associations import user_roles  

class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id')) 
    user_type = db.Column(db.String(50), nullable=False, default="user")
    address = db.Column(db.String(255), nullable=True)
    phone_number = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now)

# Relationships
    appointments = db.relationship('AppointmentModel', back_populates='user')
    roles = db.relationship('RoleModel', secondary='user_roles', back_populates='users')
    business = db.relationship('BusinessModel', back_populates='users')  # Add this lin

