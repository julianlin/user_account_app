import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Message from './Message';


export default class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      'email': '',
      'password': '',
      'message': ''}

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickForgotPassword = this.handleClickForgotPassword.bind(this);
  }

    handleChangeEmail(event) {
      this.setState({email: event.target.value});
    }

    handleChangePassword(event) {
      this.setState({password: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();

      this.setState(state => ({
        message: ""
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
              message: "email or password was incorrect"
            }));
          }
      });
    }

    handleClickForgotPassword() {
      const that = this;
      if (!this.state.email){
        that.setState(state => ({
          message: "Please enter your email to reset your password."
        }));
      } else {
        fetch('/user_with_email_exists', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
              'email': this.state.email
          })
        }).then(function(response) {
            const status = response.status;
            if(status == 200){
              window.location.href = "/reset_password/" + that.state.email;
            } else if (status == 400) {
              that.setState(state => ({
                message: "User with that email does not exist."
              }));
            }
        });
      }
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

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChangePassword}/>
                </Form.Group>

                <Message message={this.state.message}/>
                
                <span style={{width: "100%"}}>
                  <Button variant="primary" type="submit">
                      Log In
                  </Button>
                  <Button
                    style={{marginLeft: "10%"}}
                    variant="primary"
                    onClick={this.handleClickForgotPassword}>
                      Forgot Password
                  </Button>
                </span>
              </Form>
            </Col>
          </Row>
        </Container>
      )
    }
}
