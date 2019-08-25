import React, { Component } from 'react';
import AdminNavBar from './admin/AdminNavBar';
import UserNavBar from './user/UserNavBar';
import getCurrentUserInfo from './utils/userUtils';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      first_name: 'a',
      last_name: 'b'
    }
  }

  componentDidMount() {
    const that = this;
    fetch('/get_current_user_info')
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      that.setState({
        email: jsonData.email,
        first_name: jsonData.first_name,
        last_name: jsonData.last_name,
        is_admin: jsonData.is_admin
      })
      console.log(that.state)
    }); 
  }

  render() {
    if(this.state.is_admin == 1){
      return (
        <AdminNavBar first_name={this.state.first_name} last_name={this.state.last_name}/>
      )
    } else {
      return (
        <UserNavBar first_name={this.state.first_name} last_name={this.state.last_name}/>
      )
    }
  }
}
