import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePageFeatures from '../components/HomePageFeatures';
import WhyStache from '../components/WhyStache';
import HomeStats from '../components/HomeStats';
import RoundButton from '../components/RoundButton';
import Accounts from '../components/Accounts';


class HomePage extends Component {
  componentDidMount() {
    this.props.onChangePage("Home");
  };
  render() {
    let title = "Manage Instagram content and grow your account";
    let subtitle = "Utilize special tools to find engaging content, manage your hashtags, and grow your account";
    if(this.props.loginStatus){
      title = "Your Business Profiles";
      subtitle = "See your account insights"
    }
    return (
      <div className={"Page"}>
        <div className="HomePageHeader">
          <div className={"pageContainer"}>
            <div className={"TitleContent"}>
              {title}
            </div>
            <div className={"SubtitleContent"}>
              {subtitle}
            </div>
            {/*{this.props.loginStatus ? null : <RoundButton name={"Get Started"} />}*/}
          </div>
        </div>
        {this.props.loginStatus ? null : <HomePageFeatures />}
        {this.props.loginStatus ? null : <WhyStache />}
        {this.props.loginStatus ? <Accounts /> : <HomeStats />}
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
    onChangePage: (name) => {
      dispatch({
        type: 'CHANGE_PAGE',
        page: name
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
