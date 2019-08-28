import React, { Component } from '../../node_modules/react';
import Table from 'react-bootstrap/Table';
import NavBar from '../NavBar';
import InvitationRow from './InvitationRow';


export default class ManageInvitationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitationTableRows: []
    }
  }

  componentDidMount() {
    const that = this;
    fetch('/get_pending_users')
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      const invitationTableRows = jsonData.map((user) =>
        <InvitationRow 
          key={user.email}
          email={user.email}
          invitationCode={user.invitationCode}/>
      )
      that.setState({
        invitationTableRows: invitationTableRows
      })
    }); 
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Table responsive>
          <thead>
            <tr>
              <th>Email</th>
              <th>Invitation Urls</th>
            </tr>
          </thead>
          <tbody>
            {this.state.invitationTableRows}
          </tbody>
        </Table>
      </div>
    )
  }
}
