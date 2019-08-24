import Home from './Home';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginPage from './LoginPage';


function App() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginPage} />
        </div>
      </Router>
    );
  }

  ReactDOM.render(<App />, document.getElementById('root'));