import React, { Component } from '../node_modules/react';
import AdminNavBar from './admin/AdminNavBar';
import UserNavBar from './user/UserNavBar';
import getCurrentUserInfo from './utils/userUtils';


export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      isAdmin: ''
    }
  }

  componentDidMount() {
    getCurrentUserInfo(this);
  }

  render() {
    if (this.state.isAdmin == 1) {
      return(
        <AdminNavBar 
          firstName={this.state.firstName} lastName={this.state.lastName}/>
      )
    } else {
      return (
        <UserNavBar 
          firstName={this.state.firstName} lastName={this.state.lastName}/>
      )
    }
  }
}
