import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoundButton from '../components/RoundButton';

class HomePage extends Component {
  componentDidMount() {
    this.props.onChangePage("Home");
  };
  render() {
    return (
      <div className={"Page"}>
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
