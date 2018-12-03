import React, { Component } from 'react';
import { connect } from 'react-redux';
import URL from '../FetchURL/URL';
import AccountCard from './AccountCard';

class Accounts extends Component {

  getPages = () => {
    fetch(`${URL}/getInstagramPages`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'facebookAuthToken': this.props.token,
      }
    })
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
        let accounts = response.accounts.map(account => account.instagram_business_account);
        this.props.onSetAccounts(accounts);
      })
  };

  componentDidMount() {
    if(this.props.accounts === null){
      this.getPages();
    }
  }

  render() {
    let content = <div>Loading Accounts</div>;
    if(this.props.accounts !== null && this.props.accounts.length  > 0) {
      content = this.props.accounts.map(account => {
        return <AccountCard
          key={account.id}
          accountInfo={account}
        />
      })
    }
    return (
      <div className={"loggedInPage"}>
        <div className={"pageContainer"}>
          <div className={"accountHolder"}>
            {content}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.currentPage,
    loginStatus: state.loggedIn,
    token: state.auth,
    accounts: state.accounts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangePage: (name) => {
      dispatch({
        type: 'CHANGE_PAGE',
        page: name
      })
    },
    onSetAccounts: (accounts) => {
      dispatch({
        type: 'SET_ACCOUNTS',
        accounts: accounts
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
