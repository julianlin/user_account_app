import Home from './Home';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginPage from './LoginPage';
import ManageUsersPage from './admin/ManageUsersPage';


function App() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/manage_users" component={ManageUsersPage} />
        </div>
      </Router>
    );
  }

  ReactDOM.render(<App />, document.getElementById('root'));