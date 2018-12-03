import React, { Component } from 'react';
import { connect } from 'react-redux';
import HashtagSetsContent from '../components/HashtagSetsContent';

class HashtagsPage extends Component {
  componentDidMount() {
    if(!this.props.loginStatus){
      this.props.history.push('/');
    }
    this.props.onChangePage("Hashtags");
  };
  render() {
    return (
      <div className={"Page"}>
        <div className="HomePageHeader">
          <div className={"pageContainer"}>
            <div className={"TitleContent"}>
              Hashtags
            </div>
            <div className={"SubtitleContent"}>
              Create hashtag sets and add relevant hashtags
            </div>
          </div>
        </div>
        <HashtagSetsContent />
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

export default connect(mapStateToProps, mapDispatchToProps)(HashtagsPage);
