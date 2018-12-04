import React, { Component } from 'react';

//Expects attributes of clickHandler and name
//clickHandler: function to invoke when clicked
//name: button label
class RoundButton extends Component {

  render() {
    let className = "RoundButton";
    if(this.props.fill === false){
      className = "HollowButton";
    }
    return (
      <div className={className} onClick={() => this.props.clickHandler()}>
        +
      </div>
    );
  }
}

export default RoundButton;
