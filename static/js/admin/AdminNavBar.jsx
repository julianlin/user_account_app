import React, { Component } from '../../node_modules/react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default class AdminNavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">User App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Manage Users</Nav.Link>
          <Nav.Link href="/">Settings</Nav.Link>
          <Nav.Link href="/logout">Logout</Nav.Link>
          <Navbar.Text>
            Signed in as: <a href="#login">{this.props.first_name} {this.props.last_name}</a>
          </Navbar.Text>
        </Nav>

  </Navbar.Collapse>
      </Navbar>
    )
  }
}
