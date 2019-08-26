import React, { Component } from '../../node_modules/react';
import Button from 'react-bootstrap/Button';


const editButtonStyle = {
  float: 'right'
}

function FullName(props) {
  if (props.edit_state){
    return <td>
      <input type="text" value={props.first_name} onChange={props.onChangeFirstName}/>
      <input type="text" value={props.last_name} onChange={props.onChangeLastName}/>
      <Button variant='outline-dark' size='sm' style={editButtonStyle} onClick={props.onClickName}>Edit</Button></td>
  } else {
    return <td>{props.first_name} {props.last_name} <Button variant='outline-dark' size='sm' style={editButtonStyle} onClick={props.onClickName}>Edit</Button></td>
  }
}

function InfoColumn(props) {
  if (props.edit_state){
    return <td>
      <input type={props.inputType} value={props.infoValue} onChange={props.onChangeFunction}/>
      <Button variant='outline-dark' size='sm' style={editButtonStyle} onClick={props.onClickFunction}>Edit</Button></td>
  } else {
    return <td>{props.infoValue}<Button variant='outline-dark' size='sm' style={editButtonStyle} onClick={props.onClickFunction}>Edit</Button></td>
  }
}

export default class ManageUsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_name: false,
      edit_email: false,
      edit_phone_number: false,
      id: this.props.id,
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      email: this.props.email,
      phone_number: this.props.phone_number
    }
    this.handleOnChangeFirstName = this.handleOnChangeFirstName.bind(this);
    this.handleOnChangeLastName = this.handleOnChangeLastName.bind(this);
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleOnChangePhoneNumber = this.handleOnChangePhoneNumber.bind(this);
    this.handleClickEditName = this.handleClickEditName.bind(this);
    this.handleClickEditEmail = this.handleClickEditEmail.bind(this);
    this.handleClickEditPhoneNumber = this.handleClickEditPhoneNumber.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
  }


  handleOnChangeFirstName(event) {
    const val = event.target.value;
    this.setState(state =>({
      first_name: val
    }))
  }

  handleOnChangeLastName(event) {
    const val = event.target.value;
    this.setState(state =>({
      last_name: val
    }))
  }

  handleOnChangeEmail(event) {
    const val = event.target.value;
    this.setState(state =>({
      email: val
    }))
  }

  handleOnChangePhoneNumber(event) {
    const val = event.target.value;
    this.setState(state =>({
      phone_number: val
    }))
  }

  handleClickEditName() {
    this.setState(state =>({
      edit_name: !this.state.edit_name
    }))
  }

  handleClickEditEmail() {
    this.setState(state =>({
      edit_email: !this.state.edit_email
    }))
  }

  handleClickEditPhoneNumber() {
    this.setState(state =>({
      edit_phone_number: !this.state.edit_phone_number
    }))
  }

  handleClickSave() {
    const nameIsValid = this.state.first_name && this.state.last_name;
    const emailIsValid = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email));
    const phoneNumberIsValid = !isNaN(this.state.phone_number);

    let alertMessage = "";

    if(!nameIsValid) {
      alertMessage = alertMessage.concat("Make sure to fill out both first and last names.\n");
    }

    if(!emailIsValid) {
      alertMessage = alertMessage.concat("Make sure the email is in the correct format.\n")
    }

    if(!phoneNumberIsValid) {
      alertMessage = alertMessage.concat("Make sure there are only numbers in the phone number\n")
    }
    
    if(alertMessage) {
      alert(alertMessage);
    } else {
      fetch('/update_user', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'id': this.state.id,
            'first_name': this.state.first_name,
            'last_name': this.state.last_name,
            'email': this.state.email,
            'phone_number': this.state.phone_number
        })
      }).then(function(response) {
          console.log(response)
      });
    }

  }

  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <FullName first_name={this.state.first_name} last_name={this.props.last_name} edit_state={this.state.edit_name}
        onChangeFirstName={this.handleOnChangeFirstName} onChangeLastName={this.handleOnChangeLastName} onClickName={this.handleClickEditName}/>
        <InfoColumn infoValue={this.state.email} inputType={"email"} edit_state={this.state.edit_email} onChangeFunction={this.handleOnChangeEmail} onClickFunction={this.handleClickEditEmail}/>
        <InfoColumn infoValue={this.state.phone_number} inputType={"number"} edit_state={this.state.edit_phone_number} onChangeFunction={this.handleOnChangePhoneNumber} onClickFunction={this.handleClickEditPhoneNumber}/>
        <td><Button variant='outline-primary' size='sm' style={editButtonStyle} onClick={this.handleClickSave}>Save</Button></td>
      </tr>
    )
  }
}
