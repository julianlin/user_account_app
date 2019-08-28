import React, { Component } from '../node_modules/react';
import NavBar from './NavBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      isAdmin: ''
    }

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const that = this;
    fetch('/get_account_details')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      that.setState({
        'id': json.id,
        'email': json.email,
        'firstName': json.first_name,
        'lastName': json.last_name,
        'phoneNumber': json.phone_number
      })
    }); 
  }

  handleChangeFirstName(event) {
    this.setState({firstName: event.target.value});
  }

  handleChangeLastName(event) {
    this.setState({lastName: event.target.value});
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePhoneNumber(event) {
    this.setState({phoneNumber: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const nameIsValid = this.state.firstName && this.state.lastName;
    const emailIsValid = (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email));
    const phoneNumberIsValid = !isNaN(this.state.phoneNumber);

    let alertMessage = "";

    if(!nameIsValid) {
      alertMessage +=  "Make sure to fill out both first and last names.\n";
    }

    if(!emailIsValid) {
      alertMessage +=  "Make sure the email is in the correct format.\n";
    }

    if(!phoneNumberIsValid) {
      alertMessage += "Make sure there are only numbers in the phone number\n";
    }
    
    if(alertMessage) {
      alert(alertMessage);
    } else {
      fetch('/update_user', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'id': this.state.id,
            'first_name': this.state.firstName,
            'last_name': this.state.lastName,
            'email': this.state.email,
            'phone_number': this.state.phoneNumber
        })
      }).then(function(response) {
        if (response.status == 200) {
          alert("Changes saved.");
        } else {
          alert("Changes failed to save. Status : " + response.status)
        }
      });
    }
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Container style={{height:"100%"}}>
          <Row>
            <h2>Account Details</h2>
          </Row>
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

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.handleChangeEmail}/>
                </Form.Group>

                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Phone Number"
                    value={this.state.phoneNumber}
                    onChange={this.handleChangePhoneNumber}/>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit Changes
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
