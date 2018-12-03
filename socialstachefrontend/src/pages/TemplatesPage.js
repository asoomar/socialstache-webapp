import React, { Component } from 'react';
import { connect } from 'react-redux';
import TemplatesContent from '../components/TemplatesContent';

class TemplatesPage extends Component {
  componentDidMount() {
    if(!this.props.loginStatus){
      this.props.history.push('/');
    }
    this.props.onChangePage("Templates");
  };
  render() {
    return (
      <div className={"Page"}>
        <div className="HomePageHeader">
          <div className={"pageContainer"}>
            <div className={"TitleContent"}>
              Templates
            </div>
            <div className={"SubtitleContent"}>
              Use templates to make your posting process more efficient
            </div>
          </div>
        </div>
        <TemplatesContent />
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

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesPage);
