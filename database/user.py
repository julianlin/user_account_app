import random, string
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

  def create_invitation(db: Database, email: str) -> str:
    """
    return 1 if user already exists
    return 0 if failed to create user
    return invitation code otherwise
    """
    user_already_exists = User.get_user_id_from_email(db=db, email=email)
    if user_already_exists:
      return "1"

    invitation_created_flag = False
    num_attempts = 0

    while not invitation_created_flag and num_attempts < 10:
      num_attempts += 1
      invitation_code = User.generate_invitation_code()
      if not User.invitation_code_already_exists(
        db=db, invitation_code=invitation_code):
        invitation_created_flag = True

    successfully_inserted = User.insert_user(
      db=db, email=email, is_admin=0, invitation_code=invitation_code)
    return invitation_code if successfully_inserted else "0"

  @staticmethod
  def generate_invitation_code(code_len: int=10):
    return ( 
      ''.join(random.choice(string.ascii_uppercase + string.digits) 
      for _ in range(code_len)))

  @staticmethod
  def get_pending_users(db: Database):
    query_str = """
    SELECT email, invitation_code
    FROM user
    WHERE invitation_code IS NOT NULL AND (password = "" or password IS NULL)
    """
    rows = db.select(query_str=query_str)
    users = []
    
    for row in rows:
      users.append({
        'email': row[0],
        'invitationCode': row[1]
      })
    
    return users

  @staticmethod
  def get_registered_non_admin_users(db: Database):
    query_str = """
    SELECT id, email, first_name, last_name, phone_number
    FROM user
    WHERE is_admin != 1
    AND password != ""
    AND password IS NOT NULL
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
    SELECT 
    id, email, first_name, last_name, is_admin, phone_number
    FROM user
    WHERE id = {}
    """ .format(str(user_id))

    rows = db.select(query_str=query_str)
    return FlaskUser(
      user_id=rows[0][0], email=rows[0][1], first_name=rows[0][2],
       last_name=rows[0][3], is_admin=rows[0][4], phone_number=rows[0][5])
  
  @staticmethod
  def get_user_id_from_email(db: Database, email: str):
    query_str = """
    SELECT id
    FROM user
    WHERE email = "{}"
    """.format(email)

    row = db.select_one(query_str=query_str)
    return row[0] if row else 0

  def get_user_id_from_invitation_code(
    db: Database, invitation_code: str) -> int:
    query_str = """
    SELECT id
    FROM user
    WHERE invitation_code = "{}"
    """.format(invitation_code)

    row = db.select_one(query_str=query_str)
    return row[0] if row else 0

  @staticmethod
  def insert_user(
    db: Database, email: str, first_name: str='', last_name: str='',
     phone_number: str='', is_admin: int=0, invitation_code: str='') -> bool:
    query_str ="""
    INSERT INTO user (
      email, first_name, last_name, phone_number, is_admin, invitation_code)
    VALUES ("{}", "{}", "{}", "{}", {}, "{}")
    """.format(
      email, first_name, last_name, phone_number, is_admin, invitation_code)

    return db.execute(query_str=query_str)
  
  @staticmethod
  def invitation_code_already_exists(
    db: Database, invitation_code: str) -> bool:
    query_str = """
    SELECT id
    FROM user
    WHERE invitation_code = "{}"
    """.format(invitation_code)

    row = db.select_one(query_str=query_str)
    return True if row else False

  @staticmethod
  def register_user(
    db: Database, invitation_code: str, first_name: str, last_name: str,
    phone_number: str, password: str) -> bool:
    query_str = """
    UPDATE user
    SET 
    first_name = "{}", last_name = "{}", phone_number = "{}", password = "{}"
    WHERE invitation_code = "{}"
    """.format(first_name, last_name, phone_number, password, invitation_code)

    return db.execute(query_str=query_str)


  @staticmethod
  def update_user(db: Database, user_id: int, email: str,
     first_name: str, last_name: str, phone_number: str) -> bool:
    query_str = """
    UPDATE user
    SET email = "{}", first_name = "{}", last_name = "{}", phone_number = "{}"
    WHERE id = {}
    """.format(email, first_name, last_name, phone_number, user_id)
    return db.execute(query_str=query_str)

  @staticmethod
  def update_password(db: Database, email: str, password: str) -> bool:
    query_str = """
    UPDATE user
    SET password = "{}"
    WHERE email = "{}"
    """.format(password, email)
    print(query_str)
    return db.execute(query_str=query_str) 

  @staticmethod
  def user_already_registered(db: Database, invitation_code: str) -> bool:
    query_str = """
    SELECT first_name
    FROM user
    WHERE invitation_code = "{}"
    """.format(invitation_code)

    row = db.select_one(query_str=query_str)
    return True if (row and row[0]) else False

  @staticmethod
  def user_with_email_exists(db: Database, email: str) -> bool:
    query_str = """
    SELECT id
    FROM user
    WHERE email = "{}"
    """.format(email)

    return True if db.select_one(query_str=query_str) else False
