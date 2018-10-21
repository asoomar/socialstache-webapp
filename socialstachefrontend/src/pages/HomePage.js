import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoundButton from '../components/RoundButton';

class App extends Component {
  render() {
    return (
      <div className={"HomePage"}>
        <div className="HomePageHeader">
          <div className={"pageContainer"}>
            <div className={"TitleContent"}>
              Manage Instagram content and grow your account
            </div>
            <div className={"SubtitleContent"}>
              Utilize special tools to find engaging content, manage your hashtags, and grow your account
            </div>
            <RoundButton name={"Get Started"} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.currentPage
  }
};

export default connect(mapStateToProps)(App);
