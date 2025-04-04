from db import db
from datetime import datetime

class ServiceModel(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    price = db.Column(db.Float, nullable=False)
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id' , name='fk_category_category'), nullable=False)
    # image_url = db.Column(db.String(500)) 
    timestamp = db.Column(db.DateTime, default=datetime.now)

    # Relationships
    business_relationship = db.relationship('BusinessModel', back_populates='services')
    appointments = db.relationship('AppointmentModel', back_populates='service')
    category = db.relationship('CategoryModel',  back_populates="services")