import React, { Component } from 'react';
import { connect } from 'react-redux';
import SocialStacheLogo from '../assets/SocialStacheLogo50.png';
import NavbarButton from './NavbarButton';
import SignIn from './SignIn';

class Navbar extends Component {
  render() {
    let buttons = (
      <div className={"navbarButtonPanel"}>
        <NavbarButton name={"Home"} />
        <NavbarButton name={"About"} />
        <SignIn />
      </div>
    );
    if(this.props.loginStatus){
      buttons = (
        <div className={"navbarButtonPanel"}>
          <NavbarButton name={"Home"} />
          <NavbarButton name={"Hashtags"} />
          <NavbarButton name={"Templates"} />
          <NavbarButton name={"Media Finder"} />
          <NavbarButton name={"About"} />
          <SignIn />
        </div>
      );
    }
    return (
      <div className="navigation">
        <div className={"navbarTitle"}>
          <img className={"logo"} src={SocialStacheLogo} height={"30px"} alt={"SocialStache Logo"} />
          SocialStache
        </div>
        {buttons}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.currentPage,
    loginStatus: state.loggedIn
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateLoginStatus: (status) => {
      dispatch({
        type: 'UPDATE_LOGIN_STATUS',
        loggedIn: status
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
