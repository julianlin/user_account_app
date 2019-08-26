import React, { Component } from 'react';
import AdminNavBar from './admin/AdminNavBar';
import UserNavBar from './user/UserNavBar';
import UserCreationForm from './admin/UserCreationForm';
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
    .then(function(json) {
      that.setState({
        email: json.email,
        first_name: json.first_name,
        last_name: json.last_name,
        is_admin: json.is_admin
      })
    }); 
  }

  render() {
    if(this.state.is_admin == 1){
      return (
        <div>
          <AdminNavBar
          first_name={this.state.first_name} last_name={this.state.last_name}/>
          <UserCreationForm/>
        </div>
        )
    } else {
      return (
        <UserNavBar 
        first_name={this.state.first_name} last_name={this.state.last_name}/>
      )
    }
  }
}
