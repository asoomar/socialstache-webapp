import React, { Component } from 'react';
import { connect } from 'react-redux';
import URL from '../FetchURL/URL';

class Hashtag extends Component {
  state = {
    tagClicked: false
  };

  tagClicked = () => {
    this.setState({tagClicked: !this.state.tagClicked});
  };

  deleteTag = () => {
    let tags = [...this.props.selectedSet.hashtags];
    tags.splice(this.props.index, 1);
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
        } else {
          console.log(response.message)
        }
      })
      .catch(error => {
        console.log("Could not update set!");
        console.log(error);
      })
  };

  render() {
    let x = null;
    if(this.state.tagClicked) {
      x = <div className={"HashtagX"} onClick={() => this.deleteTag()}>
        X
      </div>
    }
    return (
      <div className={"Hashtag"} onClick={() => this.tagClicked()}>
        #{this.props.tag}
        {x}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
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
    onUpdateTags: (tags) => {
      dispatch({
        type: 'UPDATE_TAGS',
        tags: tags
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hashtag);
