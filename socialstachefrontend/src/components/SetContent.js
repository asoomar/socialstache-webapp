import React, { Component } from 'react';
import { connect } from 'react-redux';
import URL from '../FetchURL/URL';
import Hashtag from './Hashtag';
import axios from 'axios';

class SetContent extends Component {
  state = {
    clickedSettings: false,
    rename: '',
    tags: '',
    file: null,
    fileName: 'Choose File'
  };

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
    this.props.onSelectSet(null);
  };

  handleRename = (event) => {
    this.setState({rename: event.target.value});
  };

  handleTags = (event) => {
    this.setState({tags: event.target.value});
  };

  setFileName = (event) => {
    console.log('File chosen');
    console.log(event.target.value);
    console.log(event.target.files[0]);
    let filename = event.target.value.split(`\\`).pop();
    this.setState({file: event.target.files[0], fileName: filename});
    //this.getBase64(event.target.files[0]).then(data => console.log(data));
    // image2Base64(event.target.value)
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error))
  };

  fileUploadHandler = () => {
    fetch(`${URL}/suggestTags`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'facebookAuthToken': this.props.token,
      },
      body: JSON.stringify({
        image: this.state.file
      })
    }).then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.log(error))
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('inputfile',this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post(`${URL}/upload`,formData,config)
    .then(response => {
      console.log(response);
      if(response.data.success){
        let addTagsText = response.data.tags.map(tag => '#' + tag);
        addTagsText = addTagsText.join(' ');
        this.setState({tags: addTagsText, file: null, fileName: 'Choose File'});
      } else {
        console.log('Unable to suggest tags');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  clickDelete = () => {
    fetch(`${URL}/deleteSet`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'facebookAuthToken': this.props.token,
      },
      body: JSON.stringify({
        id: this.props.selectedSet._id
      })
    }).then(response => response.json())
      .then(response => {
        console.log(response.message);
        this.goBack();
      })
      .catch(error => {
        console.log("Could not delete set!");
        console.log(error);
      })
  };

  clickRename = () => {
    fetch(`${URL}/renameSet`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'facebookAuthToken': this.props.token,
      },
      body: JSON.stringify({
        id: this.props.selectedSet._id,
        title: this.state.rename
      })
    }).then(response => response.json())
      .then(response => {
        console.log(response.message);
        this.props.onUpdateSelectedSetTitle(this.state.rename);
        this.setState({rename: '', clickedSettings: false});
      })
      .catch(error => {
        console.log("Could not rename set!");
        console.log(error);
      });
  };

  addTags = () => {
    let tags = this.state.tags.trim().split("#");
    tags = tags.map(tag => {
      tag.trim().toLowerCase();
      let words = tag.split(" ");
      return words[0];
    }).filter(tag => {
      return tag !== ""
    });
    tags = [...tags, ...this.props.selectedSet.hashtags];
    fetch(`${URL}/updateTags`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'facebookAuthToken': this.props.token,
      },
      body: JSON.stringify({
        id: this.props.selectedSet._id,
        tags: tags
      })
    }).then(response => response.json())
      .then(response => {
        if(response.success === true){
          console.log(response.message);
          this.props.onUpdateTags(tags);
          this.setState({tags: ""});
        } else {
          console.log(response.message)
        }
      })
      .catch(error => {
        console.log("Could not update set!");
        console.log(error);
      });
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
          {this.props.selectedSet.title}
        </div>
        <div className={"setPageAddTagsContainer"}>
          <input type={"text"}
                 className={"setPageAddTagsInput"}
                 onChange={this.handleTags}
                 value={this.state.tags}
                 placeholder={"#cool #wow #funny"}/>
          <div className={"addTagsButton"} onClick={()=>this.addTags()}>
            Add
          </div>
          {/*<form className="setPageSuggestTags" method={"post"} encType={"multipart/form-data"} action={`${URL}/upload`}>*/}
          <form className="setPageSuggestTags" onSubmit={this.onSubmitForm}>
            <label className="setPageSuggestTagsInput">
              {this.state.fileName}
              <input type={"file"}
                     name={"inputfile"}
                     onChange={this.setFileName}
                     accept={".jpg, .jpeg, .png"}/>
            </label>
            <input className={"setPageSuggestTagsButton"} type={"submit"} value={"Suggest"}/>
          </form>
        </div>
        <div className={"hashtagCount"}>
          {this.props.selectedSet.hashtags.length} hashtags in this set
        </div>
        <div className={"tagsContainer"}>
          {this.props.selectedSet.hashtags.map((tag, i) => {
            return <Hashtag tag={tag} key={i} index={i}/>
          })}
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
    sets: state.hashtagSets,
    selectedSet: state.selectedSet
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSet: (set) => {
      dispatch({
        type: 'SELECT_SET',
        set: set
      })
    },
    onUpdateSelectedSetTitle: (title) => {
      dispatch({
        type: 'UPDATE_SELECTED_SET_TITLE',
        title: title
      })
    },
    onUpdateTags: (tags) => {
      dispatch({
        type: 'UPDATE_TAGS',
        tags: tags
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetContent);
