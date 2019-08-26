import random, string
from database.database import Database
from database.user import User


class Invitation:
  @staticmethod
  def create_invitation(db: Database, email: str):
    User.insert_user(db=db, email=email)
    user_id = User.get_user_id_from_email(db=db, email=email)
    invitation_created_flag = False


    while not invitation_created_flag:
      invitation_code =  Invitation.generate_invitation_code()
      invitation_created_flag = True

    query_str = """
    INSERT INTO invitation (user_id)
    """.format(user_id)
  
  @staticmethod
  def generate_invitation_code(code_len: int=10):
    return ( 
      ''.join(random.choice(string.ascii_uppercase + string.digits) 
      for _ in range(code_len)))