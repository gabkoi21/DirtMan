from models import UserModel, RoleModel, CompanyModel
from db import db

def seed_data():
    super_admin_role = RoleModel(name='super_admin')
    admin_role = RoleModel(name='admin')
    db.session.add(super_admin_role)
    db.session.add(admin_role)
    db.session.commit()

    super_admin = UserModel(username='superadmin', password='supersecret', roles=[super_admin_role])
    db.session.add(super_admin)
    db.session.commit()