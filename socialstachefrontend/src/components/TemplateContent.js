import React, { Component } from 'react';
import { connect } from 'react-redux';
import URL from '../FetchURL/URL';

class TemplateContent extends Component {
  state = {
    clickedSettings: false,
    rename: '',
    body: '',
    rows: 20
  };

  componentDidMount() {
    this.setState({body: this.props.selectedTemplate.body});
  }

  clickSettings = () => {
    this.setState({
      clickedSettings: true
    })
  };

  clickCancel = () => {
    this.setState({
      clickedSettings: false
    })
  };

  goBack = () => {
    this.props.onSelectTemplate(null);
  };

  handleRename = (event) => {
    this.setState({rename: event.target.value});
  };

  handleTemplateBody = (event) => {
    const textareaLineHeight = 24;
    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    this.setState({body: event.target.value, rows: currentRows});
  };

  clickDelete = () => {
    fetch(`${URL}/deleteTemplate`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'facebookAuthToken': this.props.token,
      },
      body: JSON.stringify({
        id: this.props.selectedTemplate._id
      })
    }).then(response => response.json())
      .then(response => {
        console.log(response.message);
        this.goBack();
      })
      .catch(error => {
        console.log("Could not delete template!");
        console.log(error);
      })
  };

  clickRename = () => {
    fetch(`${URL}/renameTemplate`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'facebookAuthToken': this.props.token,
      },
      body: JSON.stringify({
        id: this.props.selectedTemplate._id,
        title: this.state.rename
      })
    }).then(response => response.json())
      .then(response => {
        console.log(response.message);
        this.props.onUpdateSelectedSetTitle(this.state.rename);
        this.setState({rename: '', clickedSettings: false});
      })
      .catch(error => {
        console.log("Could not rename template!");
        console.log(error);
      });
  };

  save = () => {
    fetch(`${URL}/updateTemplate`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'facebookAuthToken': this.props.token,
      },
      body: JSON.stringify({
        id: this.props.selectedTemplate._id,
        body: this.state.body
      })
    }).then(response => response.json())
      .then(response => {
        if(response.success === true){
          console.log(response.message);
        } else {
          console.log(response.message)
        }
      })
      .catch(error => {
        console.log("Could not update set!");
        console.log(error);
      });
  };

  saveGoBack = () => {
    this.save();
    this.props.onSelectTemplate(null);
  };

  render() {
    let buttons = (
      <div className={"setPageButtonPanel"}>
        <div className={"setPageGeneralButton"} onClick={()=>this.clickSettings()}>
          Settings
        </div>
      </div>
    );
    if(this.state.clickedSettings) {
      buttons = (
        <div className={"setPageButtonPanel"}>
          <input type={"text"}
                 className={"textInput"}
                 onChange={this.handleRename}
                 value={this.state.rename}
                 placeholder={"Type new title here"}/>
          <div className={"setPageRenameButton"} onClick={()=>this.clickRename()}>
            Rename
          </div>
          <div className={"setPageDeleteButton"} onClick={()=>this.clickDelete()}>
            Delete
          </div>
          <div className={"setPageGeneralButton"} onClick={()=>this.clickCancel()}>
            Cancel
          </div>
        </div>
      );
    }

    return (
      <div className={"setPageContainer"}>
        <div className={"setPageTopBar"}>
          <div className={"setPageBackButtonContainer"}>
            <div className={"setPageGeneralButton"} onClick={()=>this.goBack()}>
              Back
            </div>
          </div>
          {buttons}
        </div>
        <div className={"setPageTitle"}>
          {this.props.selectedTemplate.title}
        </div>
        <div className={"templateInputContainer"}>
          <textarea className={"templateInput"}
                    rows={this.state.rows}
                    onChange={this.handleTemplateBody}
                    value={this.state.body}
                    placeholder={"Type your post template here"}/>
        </div>
        <div className={"templateSaveContainer"}>
          <div className={"templateSaveGoBack"} onClick={()=>this.saveGoBack()}>
            Save and Go Back
          </div>
          <div className={"templateSave"} onClick={()=>this.save()}>
            Save
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.currentPage,
    loginStatus: state.loggedIn,
    token: state.auth,
    templates: state.templates,
    selectedTemplate: state.selectedTemplate
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectTemplate: (template) => {
      dispatch({
        type: 'SELECT_TEMPLATE',
        template: template
      })
    },
    onUpdateSelectedSetTitle: (title) => {
      dispatch({
        type: 'UPDATE_SELECTED_TEMPLATE_TITLE',
        title: title
      })
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateContent);
