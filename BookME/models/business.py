from db import db
from datetime import datetime

class BusinessModel(db.Model):
    __tablename__ = 'businesses'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    address = db.Column(db.String(255), nullable=True)
    phone_number = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(100), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.now)
    
    # Relationships
    appointments = db.relationship('AppointmentModel', back_populates='business')  # Matches 'business' in AppointmentModel
    users = db.relationship('UserModel', back_populates='business')  # Add this line
    services = db.relationship('ServiceModel', back_populates='business_relationship')  # Matches 'business_relationship' in ServiceModel