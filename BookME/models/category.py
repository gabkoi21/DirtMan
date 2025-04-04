from db import db
from datetime import datetime

class CategoryModel(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(100), nullable=False, unique=True)
    timestamp = db.Column(db.DateTime, default=datetime.now)

    #Relationship:
    services = db.relationship("ServiceModel", back_populates="category")
    