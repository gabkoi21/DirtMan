from db import db
from datetime import datetime


class RequestModel(db.Model):

        __tablename__ = "requests"
        
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
        waste_type = db.Column(db.String(80), nullable=False)
        date = db.Column(db.String(10), nullable=False)
        time = db.Column(db.String(5), nullable=False)
        timestamp = db.Column(db.DateTime, default=datetime.now)

        