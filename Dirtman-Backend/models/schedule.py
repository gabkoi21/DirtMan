from db import db
from datetime import datetime


class ScheduleModel(db.Model):
    __tablename__ ='schedules'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), nullable=False)  # "pending", "approved", "rejected"
    timestamp = db.Column(db.DateTime, default=datetime.now)
    
    
    company = db.relationship("CompanyModel", back_populates="schedules")
    user = db.relationship("UserModel", back_populates="schedules")