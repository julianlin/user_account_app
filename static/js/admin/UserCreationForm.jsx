import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ErrorMessage from './../ErrorMessage';


export default class UserCreationForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      'email': '',
      'errorMessage': ''}

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState(state => ({
      errorMessage: ""
    }));

    const that = this;
    
    fetch('/login', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          'email': this.state.email,
          'password': this.state.password
      })
    }).then(function(response) {
        const status = response.status;
        if(status == 200){
          window.location.href = "/";
        } else if (status == 401) {
          that.setState(state => ({
            errorMessage: "email or password was incorrect"
          }));
        }
    });
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
              <ErrorMessage message={this.state.errorMessage}/>
              
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
