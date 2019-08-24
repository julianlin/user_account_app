
from database.database import Database
from utils.flask_user import FlaskUser

class User:
    @staticmethod
    def authenticate_user(db, email: str, password: str) -> bool:
        query_str = """
        SELECT id
        FROM user
        WHERE email = "{}"
        AND password  = "{}"
        """.format(email, password)

        result = db.select_one(query_str=query_str)
        return True if result else False
    
    @staticmethod
    def get_user(db: Database, user_id: int):
        query_str = """
        SELECT email, first_name, last_name, is_admin
        FROM user
        WHERE id = {}
        """ .format(str(user_id))

        rows = db.select(query_str=query_str)
        return FlaskUser(rows[0][0], rows[0][1], rows[0][2], rows[0][3])
    
    @staticmethod
    def get_user_id_from_email(db: Database, email: str):
        query_str = """
        SELECT id
        FROM user
        WHERE email = "{}"
        """.format(email)

        return db.select_one(query_str=query_str)[0]