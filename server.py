from flask import Flask, render_template, request, redirect, url_for
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
  return redirect("/login")

@app.route('/')
@login_required
def index():
  #print(current_user.email)
  return render_template("index.html")

@app.route('/login', methods=['GET'])
def login():
  return render_template("index.html")

@app.route('/login', methods=['POST'])
def login_post():
  print('login post')
  data = request.get_json()
  is_authenticated = User.authenticate_user(db=DB, email=data['email'], password=data['password'])
  if is_authenticated:
    user_id = User.get_user_id_from_email(DB, email=data['email'])
    login_user(User.get_user(DB, user_id))
    print(current_user.email)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
  return json.dumps({'success':False}), 401, {'ContentType':'application/json'}
  #return render_template("index.html")

@app.route("/logout")
@login_required
def logout():
  logout_user()
  print("Logged Out")
  return redirect("/")


    


if __name__ == "__main__":
  app.run()
