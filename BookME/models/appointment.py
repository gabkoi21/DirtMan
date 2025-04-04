from db import db
from datetime import datetime

class AppointmentModel(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', name='fk_appointment_user'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id', name='fk_appointment_business'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id', name='fk_appointment_service'), nullable=False)
    date_time = db.Column(db.DateTime, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now)

    # Relationships
    user = db.relationship('UserModel', back_populates='appointments') 
    business = db.relationship('BusinessModel', back_populates='appointments')  
    service = db.relationship('ServiceModel', back_populates='appointments')