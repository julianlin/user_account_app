class FlaskUser():
  def __init__(self, user_id, email, first_name, last_name, is_admin):
    self.user_id = user_id
    self.email = email
    self.first_name = first_name
    self.last_name = last_name
    self.is_admin = is_admin
      
  def is_authenticated(self):
    return True
  
  def is_active(self):
    return True
  
  def is_anonymous(self):
    return False

  def get_id(self):
    return self.user_id
