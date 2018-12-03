import React, { Component } from 'react';
import { connect } from 'react-redux';
import HashtagSetsContainer from './HashtagSetsContainer'
import SetContent from './SetContent';

class HashtagSetsContent extends Component {
  render() {
    let content = <HashtagSetsContainer />;
    console.log('HashtagSetsContent: selected set is ', this.props.selectedSet);
    if(this.props.selectedSet != null) {
      content = <SetContent />;
    }
    return (
      <div className={"loggedInPage"}>
        <div className={"pageContainer"}>
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.currentPage,
    loginStatus: state.loggedIn,
    selectedSet: state.selectedSet,
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

export default connect(mapStateToProps, mapDispatchToProps)(HashtagSetsContent);
