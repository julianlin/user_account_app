import React, { Component } from 'react'; 

const messageStyle = {
   color: 'red'
}

export default class ErrorMessage extends Component {
   render() {
      return (
         <div style={messageStyle}>{this.props.message}</div>
      )
   }
}
