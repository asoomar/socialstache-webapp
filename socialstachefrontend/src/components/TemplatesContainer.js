import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoundButton from "./RoundButton";
import URL from '../FetchURL/URL';
import TemplateBox from './TemplateBox';

class TemplatesContainer extends Component {
  newTemplate = () => {
    fetch(`${URL}/newTemplate`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'facebookAuthToken': this.props.token,
      },
      body: JSON.stringify({
        title: 'New Template'
      })
    }).then(response => response.json())
      .then(response => {
        if(response.success === true){
          let template = response.template;
          template.key = template._id;
          this.getTemplates()
        } else {
          console.log(response.message)
        }
      })
      .catch(error => {
        console.log("Could not save template!");
        console.log(error);
      })

  };

  getTemplates =() => {
    fetch(`${URL}/myTemplates`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'facebookAuthToken': this.props.token,
      }
    }).then(response => response.json())
      .then(response => {
        if(response.success === true){
          console.log(response.message);
          let templates = response.templates.map(temp => {
            temp.key = temp._id;
            return temp;
          });
          this.props.onUpdateTemplates(templates);
        } else {
          console.log(response.message)
        }
      })
      .catch(error => {
        console.log("Could not get templates!");
        console.log(error);
      })
  };

  getSets = () => {
    fetch(`${URL}/mySets`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'facebookAuthToken': this.props.token,
      }
    }).then(response => response.json())
      .then(response => {
        if(response.success === true){
          console.log(response.message);
          let sets = response.sets.map(set => {
            set.key = set._id;
            return set;
          });
          this.props.onUpdateSets(sets);
        } else {
          console.log(response.message)
        }
      })
      .catch(error => {
        console.log("Could not get sets!");
        console.log(error);
      })
  };

  componentDidMount() {
    this.getTemplates();
    if(this.props.sets.length === 0) {
      this.getSets();
    }
  }

  render() {
    return (
      <div className={"setsContainer"}>
        <div className={"setsButtonContainer"}>
          <RoundButton fill={true} clickHandler={this.newTemplate}/>
        </div>
        <div className={"setsBody"}>
          {this.props.templates.map((template) => {
            return (
              <TemplateBox key={template.key} template={template} />
            )
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
    templates: state.templates,
    selectedTemplate: state.selectedTemplate,
    sets: state.hashtagSets
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTemplates: (templates) => {
      dispatch({
        type: 'UPDATE_TEMPLATES',
        templates: templates,
      })
    },
    onUpdateSets: (sets) => {
      dispatch({
        type: 'UPDATE_SETS',
        sets: sets,
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesContainer);
