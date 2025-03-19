from datetime import datetime
from db import db


class CompanyModel(db.Model):
    __tablename__ = 'companies'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    users = db.relationship('UserModel', backref='company', lazy=True)  # Fixed model name
    timestamp = db.Column(db.DateTime, default=datetime.now)  