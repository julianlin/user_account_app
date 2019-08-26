from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
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

@app.route('/login', methods=['GET'])
def login():
  return render_template('index.html')

@app.route('/manage_users')
def manage_users():
  return render_template('index.html')  

@app.route('/login', methods=['POST'])
def login_post():
  data = request.get_json()
  is_authenticated = User.authenticate_user(db=DB, email=data['email'], password=data['password'])
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

@app.route('/get_users')
@login_required
def get_users():
  if current_user.is_admin:
    users = User.get_non_admin_users(db=DB)
    return jsonify(users)
  else:
    return jsonify([])

@app.route('/update_user', methods=['POST'])
@login_required
def update_user():
  if current_user.is_admin:
    data = request.get_json()
    successfully_updated_user = User.update_user(
      db=DB, user_id=data['id'], email=data['email'], first_name=data['first_name'], last_name=data['last_name'], phone_number=data['phone_number'])
    if successfully_updated_user:
      return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    else:
      return json.dumps({'success':False}), 500, {'ContentType':'application/json'}
  else:
    return json.dumps({'success':False}), 401, {'ContentType':'application/json'}

if __name__ == "__main__":
  app.run()
