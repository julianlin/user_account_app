# User Account App

# Overview

This app has 2 main functions for 2 types of users, “Admins” and “Users”. “Admins” can manage “Users” and “Users” have access to various fintech apps. I tried to keep this app as simple as possible while still showing a full range of full stack ability. This means I skipped or shortcutted things that would have taken a lot of time or added complexity, but not really show anything new in terms of technical skill.

# Features
## General
1. Login
- Users are able to login to the app using their email and password.
2. Reset Password
- Users are able to change their password if they have forgotten it. Usually, we would send a reset link to their email or phone, but to simplify things, we’ll just send users directly to the reset link once they request a password change. The reset link should be generated when requested and not be guessable, but again, in the interest of simplicity, we will make the reset link: “/reset_password/<email address>”
3. Edit Account
- Users are able to see and change their account information including name, email, and phone number. Password can be changed using the reset password feature.
4. Navigation Bar
- Users are able to navigate through the app using a nav bar.

## Admin
1. Create new accounts
- Admins can invite users with an email address. Once the user in invited, an invitation link is created. Similarly to the reset email feature, we skip the actual sending of the email for the sake of simplicity, but we do generate an invitation link with a random 10 character code.
2. Manage accounts
- Admins can see all existing users and edit their name, email, and phone number.
3. Manage invitations
- Admins can see all pending invitations with corresponding invitation links

## User
Users would have access to whatever product this app is for. However since this is just a sample app, I have not implemented any of those features. Users can still log in, change account info, etc as Admins can.

# Design

## Front-End
The front end is built using React. I followed Google’s Javascript style guide and AirBnB’s react style guide.I tried to minimize the number of packages I used for simplicity. Other front end 
packages I used include react-boostrap for style, react-router to handle routing, webpack to handle packages, and babel to handle backwards capabilities.


Future work
- react-phone-number-input
- animations, like error messages fading in/out

## Back-End
### Server
The backend server was built in Python using Flask. I followed Google’s python style guide. This is just a sample app so there is no HTTP server like Gunicorn or load balancer/web server/reverse proxy like Nginx. The only packages I used were Flask and flask-login.

Future work
- protect against sql injection, either using some ORM like SQLAlchemy or manually
- logging
- add login with Google oauth or other provider

### Database
The app uses a SQLite3 database. There is a csv file with sample data including users and invitations. The app is currently set up to clear the db every time and input data from the csv.

Future work
- Switch to more fully featured db like MySQL
- move db to cloud(aws, etc.)
- possibly add a NoSQL db for other data like metrics
- encrypt passwords
- add columns that I skipped that are usually useful for metrics like - date_created, date_modified, etc.


# How To Run

```sh
$ cd user_account_app
```
If you don't already have pip
```sh
$ easy_install pip
```
```sh
$ pip3 install flask
$ pip3 install flask-login
$ cd static
$ npm install
$ npm run build
$ cd ../
$ python3 server.py
``

