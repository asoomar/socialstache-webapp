import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class Login extends Component {
  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: ''
  };
  componentDidMount() {
    //   window.fbAsyncInit = function() {
    //     FB.init({
    //       appId      : '1852889465015879',
    //       cookie     : true,
    //       xfbml      : true,
    //       version    : 'v3.1'
    //     });
    //     FB.AppEvents.logPageView();
    //     FB.getLoginStatus(function(response) {
    //       statusChangeCallback(response);
    //     });
    //   };
    //
    //   (function(d, s, id){
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) {return;}
    //   js = d.createElement(s); js.id = id;
    //   js.src = "https://connect.facebook.net/en_US/sdk.js";
    //   fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));
  }

  // checkLoginState = () => {
  //   FB.getLoginStatus(function(response) {
  //     statusChangeCallback(response);
  //   });
  //};
  componentClicked = () => {
    console.log("clicked");
  };

  responseFacebook = response => {
    console.log(response);
  };

  render() {
    return (
      <FacebookLogin
        appId="1088597931155576"
        autoLoad={true}
        fields="name,email"
        onClick={this.componentClicked}
        callback={this.responseFacebook}
      />
    );
  }
}

export default Login;
