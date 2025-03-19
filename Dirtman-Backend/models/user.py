from db import db
from models.associations import user_roles

class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(255), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=True)

    # User type: Can be "super_admin", "admin", "driver", or "user"
    user_type = db.Column(db.String(50), nullable=False, default="user")

    # License number (only required for drivers)
    license_number = db.Column(db.String(255), unique=True, nullable=True)

    # Many-to-Many Relationship with roles
    roles = db.relationship("RoleModel", secondary=user_roles, back_populates="users")
