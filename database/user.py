
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
  def get_non_admin_users(db: Database):
    query_str = """
    SELECT id, email, first_name, last_name, phone_number
    FROM user
    WHERE is_admin != 1
    """
    rows = db.select(query_str=query_str)
    users = []

    for row in rows:
      users.append({
        'id': row[0],
        'email': row[1],
        'first_name': row[2],
        'last_name': row[3],
        'phone_number': row[4]
      })
    return users
  
  @staticmethod
  def get_user(db: Database, user_id: int):
    query_str = """
    SELECT id, email, first_name, last_name, is_admin
    FROM user
    WHERE id = {}
    """ .format(str(user_id))

    rows = db.select(query_str=query_str)
    return FlaskUser(rows[0][0], rows[0][1], rows[0][2], rows[0][3], rows[0][4])
  
  @staticmethod
  def get_user_id_from_email(db: Database, email: str):
    query_str = """
    SELECT id
    FROM user
    WHERE email = "{}"
    """.format(email)

    return db.select_one(query_str=query_str)[0]

  @staticmethod
  def update_user(db: Database, user_id: int, email: str,
     first_name: str, last_name: str, phone_number: str) -> bool:
    query_str = """
    UPDATE user
    SET email = "{}", first_name = "{}", last_name = "{}", phone_number = "{}"
    WHERE id = {}
    """.format(email, first_name, last_name, phone_number, user_id)
    successfully_updated = db.execute(query_str=query_str)

    return True if successfully_updated else False



  

