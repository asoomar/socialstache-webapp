import React, { Component } from 'react';
import URL from '../FetchURL/URL';

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

  logIn = () => {
    fetch(`${URL}/auth/facebook`, {
      redirect: 'follow',
      //headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).then(response => {
      console.log(response);
      console.log(response.url);
      window.location.href = response.url;
    })
  };

  render() {
    return (
        <div className={"SignIn"} onClick={this.logIn}>
          Sign In
        </div>
    );
  }
}

export default SignIn;
