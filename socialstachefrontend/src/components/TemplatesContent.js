import React, { Component } from 'react';
import { connect } from 'react-redux';
import TemplatesContainer from './TemplatesContainer';
import TemplateContent from './TemplateContent';

class TemplatesContent extends Component {
  render() {
    let content = <TemplatesContainer />;
    console.log('TemplatesContent: selected template is ', this.props.selectedTemplate);
    if(this.props.selectedTemplate != null) {
      content = <TemplateContent />;
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
    selectedTemplate: state.selectedTemplate,
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

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesContent);
