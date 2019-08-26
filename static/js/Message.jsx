import React, { Component } from 'react'; 

const messageStyle = {
   color: 'red'
}

export default class Message extends Component {
   render() {
      return (
         <p style={messageStyle}>{this.props.message}</p>
      )
   }
}
