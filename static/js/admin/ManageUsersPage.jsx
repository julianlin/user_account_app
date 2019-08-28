import React, { Component } from '../../node_modules/react';
import Table from 'react-bootstrap/Table';
import NavBar from '../NavBar';
import UserRow from './UserRow';


export default class ManageUsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTableEntries: []
    }
  }

  componentDidMount() {
    const that = this;
    fetch('/get_users')
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      const userTableEntries = jsonData.map((user) =>
        <UserRow
          key={user.id}
          id={user.id}
          firstName={user.first_name}
          lastName={user.last_name}
          email={user.email}
          phoneNumber={user.phone_number}/>
      );
      that.setState({
        userTableEntries: userTableEntries
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
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {this.state.userTableEntries}
          </tbody>
        </Table>
      </div>
    )
  }
}
