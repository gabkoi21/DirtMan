from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

# A function to handle database operations
def some_db_operation():
    session = db.session
    try:
        # Your database operation
        session.commit()  # Commit your changes
    except Exception as e:
        session.rollback()  # Rollback on error
        raise e
    finally:
        session.remove()  # Always remove the session to avoid leaks
