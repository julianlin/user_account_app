import React, { Component } from '../../node_modules/react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import AdminNavBar from './AdminNavBar';
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
    fetch('/get_users')
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      const invitationTableRows = [<InvitationRow email={'a'} invitationCode={'b'}/>]
      that.setState({
        invitationTableRows: invitationTableRows
      })
    }); 
  }

  render() {
    return (
      <div>
        <AdminNavBar/>
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