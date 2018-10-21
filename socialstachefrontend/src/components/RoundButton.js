import React, { Component } from 'react';

//Expects attributes of clickHandler and name
//clickHandler: function to invoke when clicked
//name: button label
class RoundButton extends Component {

  render() {
    return (
      <a href={"#"} className={"link"}>
        <div className={"RoundButton"}>
          {this.props.name}
        </div>
      </a>
    );
  }
}

export default RoundButton;
