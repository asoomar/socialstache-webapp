import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePageFeatures from '../components/HomePageFeatures';
import WhyStache from '../components/WhyStache';
import HomeStats from '../components/HomeStats';
import RoundButton from '../components/RoundButton';


class HomePage extends Component {
  componentDidMount() {
    this.props.onChangePage("Home");
  };
  render() {
    let title = "Manage Instagram content and grow your account";
    let subtitle = "Utilize special tools to find engaging content, manage your hashtags, and grow your account";
    if(this.props.loginStatus){
      title = "Your Business Profiles";
      subtitle = "Choose which profile you want to work on"
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
            {this.props.loginStatus ? null : <RoundButton name={"Get Started"} />}
          </div>
        </div>
        <HomePageFeatures />
        <WhyStache/>
        <HomeStats/>
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
