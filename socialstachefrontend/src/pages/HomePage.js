import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="HomePage">
        <div className={"pageContainer"}>
          <div className={"TitleContent"}>
            Manage Instagram content and grow your account
          </div>
          <div className={"SubtitleContent"}>
            Utilize special tools to find engaging content, manage your hashtags, and grow your account
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
