from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_login import (
  LoginManager, login_user, logout_user, login_required, current_user)
from database.database import Database
from database.user import User
from utils.flask_user import FlaskUser
import json

DB = Database()

app = Flask(__name__,
 static_folder = './public',
 template_folder="./static")

app.secret_key = "super_secret_key"

login_manager = LoginManager()
login_manager.login_view
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
  return User.get_user(DB, user_id)

@login_manager.unauthorized_handler
def unauth_handler():
  return redirect('/login')

@app.route('/')
@login_required
def index():
  return render_template('index.html')

@app.route('/register/<invitation_code>')
def register(invitation_code):
  return render_template('index.html') 

@app.route('/login', methods=['GET'])
def login():
  return render_template('index.html')

@app.route('/manage_users')
def manage_users():
  return render_template('index.html') 

@app.route('/manage_invitations')
def manage_invitations():
  return render_template('index.html') 

@app.route('/account')
def account():
  return render_template('index.html')

@app.route('/reset_password/<email>')
def reset_password(email):
  return render_template('index.html')

@app.route('/login', methods=['POST'])
def login_post():
  data = request.get_json()
  is_authenticated = User.authenticate_user(
    db=DB, email=data['email'], password=data['password'])
  if is_authenticated:
    user_id = User.get_user_id_from_email(DB, email=data['email'])
    login_user(User.get_user(DB, user_id))
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
  return json.dumps({'success':False}), 401, {'ContentType':'application/json'}

@app.route('/logout')
@login_required
def logout():
  logout_user()
  return redirect("/")

@app.route('/invitation_code_is_valid', methods=['POST'])
def invitation_code_is_valid():
  data = request.get_json()
  invitation_code = data['path']['id']
  return jsonify({
    'invitation_code_is_valid':
     not User.user_already_registered(db=DB, invitation_code=invitation_code)})

@app.route('/user_with_email_exists', methods=['POST'])
def user_with_email_exists():
  data = request.get_json()
  user_with_email_exists = User.user_with_email_exists(
    db=DB, email=data['email'])
  if user_with_email_exists:
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
  else:
    return json.dumps(
      {'success':False}), 400, {'ContentType':'application/json'}



@app.route('/get_current_user_info')
@login_required
def get_current_user_info():
  user_info = {
    'email': current_user.email,
    'first_name': current_user.first_name,
    'last_name': current_user.last_name,
    'is_admin': current_user.is_admin
  }
  return jsonify(user_info)

@app.route('/get_pending_users')
@login_required
def get_pending_users():
  if current_user.is_admin:
    users = User.get_pending_users(db=DB)
    return jsonify(users)
  else:
    return json.dumps(
      {'success':False}), 401, {'ContentType':'application/json'}

@app.route('/get_users')
@login_required
def get_users():
  if current_user.is_admin:
    users = User.get_registered_non_admin_users(db=DB)
    return jsonify(users)
  else:
    return json.dumps(
      {'success':False}), 401, {'ContentType':'application/json'}


@app.route('/register_user', methods=['POST'])
def register_user():
  data = request.get_json()
  
  successfully_registered = User.register_user(
    db=DB, invitation_code=data['path']['id'], first_name=data['first_name'], 
    last_name=data['last_name'], phone_number=data['phone_number'],
    password=data['password'])
  if successfully_registered:
    return json.dumps(
        {'success':True}), 200, {'ContentType':'application/json'}
  else:
    return json.dumps(
        {'success':False}), 500, {'ContentType':'application/json'}


@app.route('/send_invite', methods=['POST'])
@login_required
def send_invite():
  if current_user.is_admin:
    data = request.get_json()
    invitation_code = User.create_invitation(db=DB, email=data['email'])
  return jsonify({'invitation_code': invitation_code})

@app.route('/get_account_details')
@login_required
def get_account_details():
  return jsonify({
    'id': current_user.user_id,
    'email': current_user.email,
    'first_name': current_user.first_name,
    'last_name': current_user.last_name,
    'phone_number': current_user.phone_number
  })

@app.route('/change_password', methods=['POST'])
def change_password():
  data = request.get_json()
  successfully_updated = User.update_password(
    db=DB, email=data['email'], password=data['password'])
  if successfully_updated:
    return json.dumps(
        {'success':True}), 200, {'ContentType':'application/json'}
  else:
    return json.dumps(
        {'success':False}), 500, {'ContentType':'application/json'} 

@app.route('/update_user', methods=['POST'])
@login_required
def update_user():
  data = request.get_json()
  if current_user.is_admin or current_user.user_id == data['id']:
    successfully_updated_user = User.update_user(
      db=DB, user_id=data['id'], email=data['email'],
       first_name=data['first_name'], last_name=data['last_name'],
        phone_number=data['phone_number'])

    if successfully_updated_user:
      return json.dumps(
        {'success':True}), 200, {'ContentType':'application/json'}
    else:
      return json.dumps(
        {'success':False}), 500, {'ContentType':'application/json'}
  else:
    return json.dumps(
      {'success':False}), 401, {'ContentType':'application/json'}

if __name__ == "__main__":
  app.run()
