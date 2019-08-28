import React, { Component } from 'react';
import NavBar from './NavBar';
import UserCreationForm from './admin/UserCreationForm';
import getCurrentUserInfo from './utils/userUtils';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      'isAdmin': ''}
  }

  componentDidMount() {
    getCurrentUserInfo(this)
  }

  render() {
    if(this.state.isAdmin == 1){
      return (
        <div>
          <NavBar/>
          <UserCreationForm/>
        </div>
        )
    } else {
      return (
        <div>
          <NavBar/>
          Welcome
        </div>
      )
    }
  }
}
