import React, { Component } from 'react';
import URL from '../FetchURL/URL';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

class SignIn extends Component {

  sendToken = (token) => {
    fetch(`${URL}/setToken`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        token: token
      })
    }).then(response => response.json())
      .then(response => {
        console.log(response.message);
        if(response.success){
          this.props.onUpdateAuthToken(token);
          this.props.onUpdateLoginStatus(true);
        }
      })
      .catch(error => {
        console.log("Could not connect to server ", error);
      })
  };

  logout = () => {
    console.log('User Logged Out');
    this.props.onChangePage('Home');
    this.props.onUpdateLoginStatus(false);
  };

  responseFacebook = response => {
    console.log(response);
    this.sendToken(response.accessToken);
  };

  render() {
    let fbContent;
    if (this.props.loginStatus) {
      fbContent = (
        <div className={"SignIn"} onClick={this.logout}>
          Sign Out
        </div>);
    } else {
      fbContent = (<FacebookLogin
        appId="1852889465015879"
        autoLoad={false}
        fields="name,email"
        scope={"instagram_basic, " +
        "instagram_manage_comments, " +
        "instagram_manage_insights, " +
        "manage_pages, " +
        "pages_show_list, " +
        "read_insights, " +
        "business_management"}
        render={renderProps => (
          <div className={"SignIn"} onClick={renderProps.onClick}>
            Sign In
          </div>
        )}
        callback={this.responseFacebook} />);
    }
    return (
      <div>
        {fbContent}
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
    },
    onUpdateAuthToken: (token) => {
      dispatch({
        type: 'UPDATE_AUTH_TOKEN',
        authToken: token
      })
    },
    onChangePage: (name) => {
      dispatch({
        type: 'CHANGE_PAGE',
        page: name
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);