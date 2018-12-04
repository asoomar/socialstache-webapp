import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        <div className={"mediaFinderBody"}>
          This feature is coming soon...
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
