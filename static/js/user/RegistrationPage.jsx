import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class RegistrationPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      'firstName': '',
      'lastName': '',
      'phoneNumber': '',
      'password': ''
    }

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/invitation_code_is_valid', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          'path': this.props.match.params
      })
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      if (json.invitation_code_is_valid == false) {
        window.location.href = "/"
      }
    });
  }

  handleChangeFirstName(event) {
    this.setState({firstName: event.target.value});
  }

  handleChangeLastName(event) {
    this.setState({lastName: event.target.value});
  }

  handleChangePhoneNumber(event) {
    this.setState({phoneNumber: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let alertMessage = "";

    if (!this.state.firstName) {
      alertMessage += "Please enter your first name.\n"
    }

    if (!this.state.lastName) {
      alertMessage += "Please enter your last name.\n"
    }

    if (!this.state.phoneNumber) {
      alertMessage += "Please enter your phone number.\n"
    }

    if (isNaN(this.state.phoneNumber)) {
      alertMessage += 
      "Please make sure your phone number only contains digits.\n"
    }

    if(alertMessage) {
      alert(alertMessage);
    } else {

      fetch('/register_user', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'path': this.props.match.params,
            'first_name': this.state.firstName,
            'last_name': this.state.lastName,
            'phone_number': this.state.phoneNumber,
            'password': this.state.password
        })
      }).then(function(response) {
        return response.json()
      }).then(function(json) {
        window.location.href = "/";
      });
    }
  }

  render() {
    return (
      <Container style={{height:"100%"}}>
        <Row className="justify-content-md-center" style={{height:"100%"}}>
          <Col lg={5} style={{marginTop:"auto", marginBottom:"auto"}}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus={true}
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.handleChangeFirstName}/>
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChangeLastName}/>
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Phone Number"
                  value={this.state.phoneNumber}
                  onChange={this.handleChangePhoneNumber}/>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChangePassword}/>
              </Form.Group>
              
              <Button variant="primary" type="submit">
                  Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
