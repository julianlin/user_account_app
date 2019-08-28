import React, { Component } from '../../node_modules/react';
import Button from 'react-bootstrap/Button';


const editButtonStyle = {
  float: 'right'
}

function FullName(props) {
  if (props.editState){
    return (
    <td>
      <input
        type="text"
        value={props.firstName}
        onChange={props.onChangeFirstName}/>
      <input
        type="text"
        value={props.lastName}
        onChange={props.onChangeLastName}/>
      <Button
        variant='outline-dark'
        size='sm'
        style={editButtonStyle}
        onClick={props.onClickName}>
          Edit
      </Button>
    </td>
    )
  } else {
    return (
    <td>
      {props.firstName} {props.lastName}
      <Button
        variant='outline-dark'
        size='sm'
        style={editButtonStyle}
        onClick={props.onClickName}>
          Edit
      </Button>
    </td>
    )
  }
}

function InfoColumn(props) {
  if (props.editState){
    return <td>
      <input
        type={props.inputType}
        value={props.infoValue}
        onChange={props.onChangeFunction}/>
      <Button
        variant='outline-dark'
        size='sm'
        style={editButtonStyle}
        onClick={props.onClickFunction}>
          Edit
      </Button>
    </td>
  } else {
    return (
      <td>
        {props.infoValue}
        <Button
          variant='outline-dark'
          size='sm' 
          style={editButtonStyle}
          onClick={props.onClickFunction}>
            Edit
        </Button>
      </td>
    )
  }
}

export default class ManageUsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: false,
      editEmail: false,
      editPhoneNumber: false,
      id: this.props.id,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      phoneNumber: this.props.phoneNumber
    }
    
    this.handleOnChangeFirstName = this.handleOnChangeFirstName.bind(this);
    this.handleOnChangeLastName = this.handleOnChangeLastName.bind(this);
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleOnChangePhoneNumber = this.handleOnChangePhoneNumber.bind(this);
    this.handleClickEditName = this.handleClickEditName.bind(this);
    this.handleClickEditEmail = this.handleClickEditEmail.bind(this);
    this.handleClickEditPhoneNumber = 
    this.handleClickEditPhoneNumber.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
  }


  handleOnChangeFirstName(event) {
    const val = event.target.value;
    this.setState(state =>({
      firstName: val
    }))
  }

  handleOnChangeLastName(event) {
    const val = event.target.value;
    this.setState(state =>({
      lastName: val
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
      phoneNumber: val
    }))
  }

  handleClickEditName() {
    this.setState(state =>({
      editName: !this.state.editName
    }))
  }

  handleClickEditEmail() {
    this.setState(state =>({
      editEmail: !this.state.editEmail
    }))
  }

  handleClickEditPhoneNumber() {
    this.setState(state =>({
      editPhoneNumber: !this.state.editPhoneNumber
    }))
  }

  handleClickSave() {
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
      <tr>
        <td>{this.props.id}</td>
        <FullName 
          firstName={this.state.firstName} lastName={this.state.lastName}
          editState={this.state.editName} 
          onChangeFirstName={this.handleOnChangeFirstName}
          onChangeLastName={this.handleOnChangeLastName}
          onClickName={this.handleClickEditName}/>
        <InfoColumn 
          infoValue={this.state.email}
          inputType={"email"} editState={this.state.editEmail}
          onChangeFunction={this.handleOnChangeEmail}
          onClickFunction={this.handleClickEditEmail}/>
        <InfoColumn
          infoValue={this.state.phoneNumber}
          inputType={"number"}
          editState={this.state.editPhoneNumber}
          onChangeFunction={this.handleOnChangePhoneNumber}
          onClickFunction={this.handleClickEditPhoneNumber}/>
        <td>
          <Button
            variant='outline-primary'
            size='sm'
            style={editButtonStyle}
            onClick={this.handleClickSave}>
              Save
          </Button></td>
      </tr>
    )
  }
}
