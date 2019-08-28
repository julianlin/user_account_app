import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Message from '../Message';


export default class UserCreationForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      'email': '',
      'message': '',
      'message2': ''}

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const emailIsValid = (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email));

    if (emailIsValid) {
      this.setState(state => ({
        message: ""
      }));
    } else {
      this.setState(state => ({
        message: "email is invalid"
      }));
      return
    }

    const that = this;
    
    fetch('/send_invite', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          'email': this.state.email
      })
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      let message = '';
      let message2 = '';
      if (json.invitation_code == 0) {
        message = 'Invitation failed to send.';
      } else if (json.invitation_code == 1) {
        message = 'User already exists.';
      } else {
        message = 'Invitation for ' + that.state.email + ": ";
        message2 = "http://127.0.0.1:5000/register/" + json.invitation_code;
      }

      that.setState(state => ({
        message: message,
        message2: message2
      }));
    })
    ;
  }

  render() {
    return (
      <Container style={{height:"100%"}}>
        <Row className="justify-content-md-center" style={{height:"100%"}}>
          <Col lg={5} style={{marginTop:"auto", marginBottom:"auto"}}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  autoFocus={true}
                  placeholder="Email Address"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}/>
              </Form.Group>
              <Message message={this.state.message}/>
              <Message message={this.state.message2}/>
              
              <Button variant="primary" type="submit">
                  Send Invitation
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}
