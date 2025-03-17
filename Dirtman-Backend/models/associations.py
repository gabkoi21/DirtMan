from db import db

user_roles = db.Table(
    'user_roles',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id', name='fk_userrole_user'), primary_key=True),
    db.Column('role_id', db.Integer, db.ForeignKey('roles.id', name='fk_userrole_role'), primary_key=True)
) 