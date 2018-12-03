import React, { Component } from 'react';
import { connect } from 'react-redux';

class SetBox extends Component {
  state = {
    displayTags: false,
    tagsGenerated: ''
  };

  clickEdit = () => {
    console.log("Edit clicked");
    this.props.onSelectSet(this.props.set)
  };

  closeDisplay = () => {
    this.setState({displayTags: false});
  };

  clickGenerate = () => {
    const limit = Math.min(this.props.set.hashtags.length, 30);
    let tags = [...this.props.set.hashtags];
    tags.sort(() => .5 - Math.random());
    let tagsGenerated = tags.slice(0, limit).map((tag) => `#${tag}`).join(' ');
    this.setState({displayTags: true, tagsGenerated: tagsGenerated});
  };

  render() {
    const limit = Math.min(this.props.set.hashtags.length, 10);
    const tagSamples = this.props.set.hashtags.slice(0, limit);
    let hashtagSamples = tagSamples.map((tag, i) => {
      return (
        <div className={"hashtagSample"} key={i}>
          #{tag}
        </div>
      )
    });
    let displayTags = null;
    if(this.state.displayTags) {
      displayTags = (
      <div className={"setHashtags"}>
        {/*<div className={"setHashtagsX"}>*/}
          {/*<div className={"setHashtagsXIcon"} onClick={()=>this.closeDisplay()}>X</div>*/}
        {/*</div>*/}
        <div className={"setHashtagsDisplayed"}>
          {this.state.tagsGenerated}
        </div>
      </div>)
    }
    return (
      <div className={"setBox"}>
        <div className={"setText"}>
          <div className={"setTitle"}>
            {this.props.set.title}
          </div>
          <div className={"setBody"}>
            <div>{this.props.set.hashtags.length} hashtags in this set</div>
            <div className={"hashtagSamples"}>
              {hashtagSamples}
            </div>
            {displayTags}
          </div>
        </div>
        <div className={"setButton"}>
          <div className={"editSetButton"} onClick={() => this.clickEdit()}>
            Edit
          </div>
        </div>
        <div className={"setButton"}>
          <div className={"generateSetButton"} onClick={() => this.clickGenerate()}>
            Generate
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
    sets: state.hashtagSets
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSet: (set) => {
      dispatch({
        type: 'SELECT_SET',
        set: set
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetBox);
