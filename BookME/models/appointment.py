from db import db
from datetime import datetime

class AppointmentModel(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    date_time = db.Column(db.DateTime, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now)

    # Relationships
    user = db.relationship('UserModel', back_populates='appointments')  # Matches 'appointments' in UserModel
    business = db.relationship('BusinessModel', back_populates='appointments')  # Matches 'appointments' in BusinessModel



