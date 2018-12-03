import React, { Component } from 'react';
import { connect } from 'react-redux';
import URL from '../FetchURL/URL';

class AccountCard extends Component {
  state = {
    name: '-',
    profilePhoto: null,
    followers: '-',
    following: '-',
    mediaCount: '-',
    engagementRate: 0,
    averageLikes: 0,
    averageComments: 0
  };

  getAccountStats = () => {
    let igid = this.props.accountInfo.id;
    fetch(`${URL}/accountStats/${igid}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'facebookAuthToken': this.props.token,
      }
    }).then(resp => resp.json())
      .then(response => {
        if(response.success) {
          this.setState({
            averageLikes: Math.round(response.likeAvg),
            averageComments: Math.round(response.commentAvg),
            engagementRate: Math.round((response.engagementAvg / this.props.accountInfo.followers_count)*10000)/100,
          });
        } else {
          console.log(response.message);
        }
      }).catch(err => {
        console.log(err);
    })
  };

  componentDidMount() {
    this.setState({
      name: this.props.accountInfo.name,
      profilePhoto: this.props.accountInfo.profile_picture_url,
      followers: this.props.accountInfo.followers_count,
      following: this.props.accountInfo.follows_count,
      mediaCount: this.props.accountInfo.media_count,
    });
    this.getAccountStats();
  }

  render() {
    return (
      <div className={"card"}>
        <div className={"imageHolder"}>
          <img className={"accountImage"} src={this.state.profilePhoto} alt={"Instgram Profile"}/>
        </div>
        <div className={"profileStats"}>
          <div className={"profileTitle"}>{this.state.name}</div>
          <div className={"profileNumbers"}>
            <div className={"profileColumn"}>
              <div className={"profileStat"}>
                <div>{this.state.mediaCount}</div>
                <div className={"profileLabel"}>posts</div>
              </div>
              <div className={"profileStat"}>
                <div>{this.state.followers}</div>
                <div className={"profileLabel"}>followers</div>
              </div>
              <div className={"profileStat"}>
                <div>{this.state.following}</div>
                <div className={"profileLabel"}>following</div>
              </div>
            </div>
            <div className={"profileColumn"}>
              <div className={"profileStat"}>
                <div>{this.state.engagementRate}%</div>
                <div className={"profileLabel"}>engagement rate</div>
              </div>
              <div className={"profileStat"}>
                <div>{this.state.averageLikes}</div>
                <div className={"profileLabel"}>average likes</div>
              </div>
              <div className={"profileStat"}>
                <div>{this.state.averageComments}</div>
                <div className={"profileLabel"}>average comments</div>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountCard);
