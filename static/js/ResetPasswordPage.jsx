import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Message from './Message';

export default class ResetPasswordPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      'password': ''
    }

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const that = this;

    if (!this.state.password) {
      that.setState(state => ({
        message: "Please enter a new password",
      }));
    } else {
      fetch('/change_password', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'email': this.props.match.params.email,
            'password': this.state.password
        })
      }).then(function(response) {
        if (response.status == 200) {
          window.location.href = "/";
        } else {
          alert("Changes failed to save. Status : " + response.status)
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
              <Form.Group controlId="formPassword">
                <Form.Label>
                  Changing password for {this.props.match.params.email}
                </Form.Label>
                <Form.Control
                  type="password"
                  autoFocus={true}
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChangePassword}/>
              </Form.Group>
              <Message message={this.state.message}/>
              
              <Button variant="primary" type="submit">
                  Reset Password
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}
