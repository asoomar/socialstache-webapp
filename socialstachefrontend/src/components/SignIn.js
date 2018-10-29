import React, { Component } from 'react';
import URL from '../FetchURL/URL';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

class SignIn extends Component {
  // logIn = () => {
  //   fetch(`${URL}/auth/facebook`, {
  //     redirect: 'follow',
  //     headers: {
  //       //'Content-Type': 'application/json; charset=utf-8'
  //     }
  //   }).then(response => {
  //     console.log(response);
  //     return response.json();
  //   })
  //     .then(response => {
  //       if(response.success === true){
  //         console.log('Successful Login!');
  //       }
  //     })
  // };

  // logIn = () => {
  //   fetch(`${URL}/auth/facebook`, {
  //     redirect: 'follow',
  //     //headers: {'Content-Type': 'application/json; charset=utf-8'}
  //   }).then(response => {
  //     console.log(response);
  //     console.log(response.url);
  //     window.location.href = response.url;
  //   })
  // };

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
          this.props.onUpdateLoginStatus(true);
        }
      })
      .catch(error => {
        console.log("Could not connect to server ", error);
      })
  };

  logout = () => {
    console.log('User Logged Out');
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);