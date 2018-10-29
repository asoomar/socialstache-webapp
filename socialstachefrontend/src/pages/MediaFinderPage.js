import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoundButton from '../components/RoundButton';

class MediaFinderPage extends Component {
  componentDidMount() {
    if(!this.props.loginStatus){
      this.props.history.push('/');
    }
    this.props.onChangePage("Media Finder");
  };
  render() {
    return (
      <div className={"Page"}>
        <div className="HomePageHeader">
          <div className={"pageContainer"}>
            <div className={"TitleContent"}>
              Media Finder
            </div>
            <div className={"SubtitleContent"}>
              Find the most engaging content of a user
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

export default connect(mapStateToProps, mapDispatchToProps)(MediaFinderPage);