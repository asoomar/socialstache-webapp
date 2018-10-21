import React, { Component } from 'react';

//Expects attributes of clickHandler and name
//clickHandler: function to invoke when clicked
//name: button label
class RoundButton extends Component {

  render() {
    return (
      <div className={"RoundButton"} onClick={() => this.props.clickHandler()}>
        {this.props.name}
      </div>
    );
  }
}

export default RoundButton;
