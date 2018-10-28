import React, { Component } from 'react';
import { connect } from 'react-redux';
import SocialStacheLogo from '../assets/SocialStacheLogo50.png';
import NavbarButton from './NavbarButton';
import URL from '../FetchURL/URL'
import SignIn from './SignIn';

class Navbar extends Component {
  componentDidMount() {
    fetch(`${URL}/isloggedin`, {
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    }).then(response => response.json())
      .then(response => {
        console.log(response);
      })
  }
  render() {
    return (
      <div className="navigation">
        <div className={"navbarTitle"}>
          <img className={"logo"} src={SocialStacheLogo} height={"30px"} alt={"SocialStache Logo"} />
          SocialStache
        </div>
        <div className={"navbarButtonPanel"}>
          <NavbarButton name={"Home"} />
          <NavbarButton name={"About"} />
          <SignIn />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.currentPage,
  };
};

export default connect(mapStateToProps)(Navbar);
