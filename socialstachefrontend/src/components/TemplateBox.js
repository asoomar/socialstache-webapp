import React, { Component } from 'react';
import { connect } from 'react-redux';

class TemplateBox extends Component {
  state = {
    displayBody: false,
    bodyGenerated: ''
  };

  clickEdit = () => {
    console.log("Edit clicked");
    this.props.onSelectTemplate(this.props.template);
  };

  clickGenerate = () => {
    console.log("Generate Clicked");
    let copy = this.props.template.body;
    let re = /{{[^}}]*}}/g;
    let matches = copy.match(re);
    //let i = 0;
    //let match = re.exec(copy);
    //debugger;
    //console.log(match);
    if(matches === null) {
      return;
    }
    for (let i = 0; i < matches.length; i++) {
      let params = matches[i].slice(2, matches[i].length - 2).split(',');
      if (params.length !== 2) {
        //changed this next line
        copy = copy.replace(matches[i], "");
        //copy = copy.splice(match.index, matches[i].length, "");
      } else {
        let setName = params[0].trim().toLowerCase();
        let amount = Number(params[1].trim());
        let setIndex = null;
        for(let j = 0; j < this.props.sets.length; j++){
          if(setName === this.props.sets[j].title.toLowerCase()){
            setIndex = j;
            break;
          }
        }
        if(setIndex === null) {
          //changed this next line
          copy = copy.replace(matches[i], "");
          //copy = copy.splice(match.index, matches[i].length, "");
        } else if(isNaN(amount)){
          //changed this next line
          copy = copy.replace(matches[i], "");
          //copy = copy.splice(match.index, matches[i].length, "");
        } else {
          let tags = [...this.props.sets[setIndex].hashtags];
          tags.sort(() => .5 - Math.random());
          tags = tags.slice(0, amount);
          tags = tags.map((tag) => `#${tag}`);
          let tagString = tags.join(' ');
          //changed this next line
          copy = copy.replace(matches[i], tagString);
          //copy = copy.splice(match.index, matches[i].length, tagString);
        }
      }
      //i++;
    }
    this.setState({bodyGenerated: copy, displayBody: true});
  };

  render() {
    let displayBody = (
      <div className={"hashtagSamples"}>
        {this.props.template.body.length === 0 ? 'This template is empty' : this.props.template.body.slice(0, 45) + '...'}
      </div>
    );
    if(this.state.displayBody) {
      displayBody = (
        <div className={"setHashtags"}>
          <div className={"templateBodyDisplayed"}>
            {this.state.bodyGenerated}
          </div>
        </div>)
    }
    return (
      <div className={"setBox"}>
        <div className={"setText"}>
          <div className={"setTitle"}>
            {this.props.template.title}
          </div>
          <div className={"setBody"}>
            {displayBody}
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
    templates: state.templates,
    sets: state.hashtagSets
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectTemplate: (template) => {
      dispatch({
        type: 'SELECT_TEMPLATE',
        template: template
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateBox);
