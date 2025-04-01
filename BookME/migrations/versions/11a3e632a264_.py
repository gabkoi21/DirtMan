"""empty message

Revision ID: 11a3e632a264
Revises: e51f5a03f57b
Create Date: 2025-04-01 01:00:15.080208

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '11a3e632a264'
down_revision = 'e51f5a03f57b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('businesses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('address', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('phone_number', sa.String(length=50), nullable=True))
        batch_op.add_column(sa.Column('email', sa.String(length=100), nullable=True))

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('address', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('address')

    with op.batch_alter_table('businesses', schema=None) as batch_op:
        batch_op.drop_column('email')
        batch_op.drop_column('phone_number')
        batch_op.drop_column('address')

    # ### end Alembic commands ###
