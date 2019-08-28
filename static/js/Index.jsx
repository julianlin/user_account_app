import Home from './Home';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from './LoginPage';
import ManageUsersPage from './admin/ManageUsersPage';
import ManageInvitationsPage from './admin/ManageInvitationsPage';
import RegistrationPage from './user/RegistrationPage';
import AccountPage from './AccountPage';
import ResetPasswordPage from './ResetPasswordPage';


function App() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home}/>
          <Route
           path='/register/:id' component={RegistrationPage}/>
          <Route exact path='/login' component={LoginPage}/>
          <Route exact path='/manage_users' component={ManageUsersPage}/>
          <Route 
            exact path='/manage_invitations' component={ManageInvitationsPage}/>
          <Route exact path='/account' component={AccountPage}/>
          <Route
           path='/reset_password/:email' component={ResetPasswordPage}/>
        </div>
      </Router>
    );
  }

  ReactDOM.render(<App />, document.getElementById('root'));