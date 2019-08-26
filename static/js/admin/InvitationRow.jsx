import React, { Component } from '../../node_modules/react';


export default class InvitationRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      invitationCode: this.props.invitationCode
    }
  }

  render() {
    return (
      <tr>
        <td>{this.props.email}</td>
        <td>
          <a href={"http://127.0.0.1:5000/invitation/" + 
            this.props.invitationCode}>
            http://127.0.0.1:5000/invitation/{this.props.invitationCode}
          </a>
        </td>
      </tr>
    )
  }
}
