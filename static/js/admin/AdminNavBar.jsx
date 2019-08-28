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
            <Nav.Link href="/manage_users">Manage Users</Nav.Link>
            <Nav.Link href="/manage_invitations">Manage Invitations</Nav.Link>
            <Nav.Link href="/account">Account</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
            <Navbar.Text>
              Signed in as: 
              <a href="#login">
                <span> {this.props.firstName} {this.props.lastName}</span>
              </a>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
