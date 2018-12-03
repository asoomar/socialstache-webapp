import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoundButton from "./RoundButton";
import URL from '../FetchURL/URL';
import SetBox from './SetBox';

class HashtagSetsContainer extends Component {
  newSet = () => {
    console.log('Button Clicked');
    fetch(`${URL}/newSet`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'facebookAuthToken': this.props.token,
      },
      body: JSON.stringify({
        title: 'New Hashtag Set'
      })
    }).then(response => response.json())
      .then(response => {
        if(response.success === true){
          console.log(response.message);
          let set = response.set;
          set.key = set._id;
          this.getSets();
        } else {
          console.log(response.message)
        }
      })
      .catch(error => {
        console.log("Could not save set!");
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
    this.getSets();
  }

  render() {
    return (
      <div className={"setsContainer"}>
        <div className={"setsButtonContainer"}>
          <RoundButton name={"New Hashtag Set"} fill={false} clickHandler={this.newSet}/>
        </div>
        <div className={"setsBody"}>
          {this.props.sets.map((set) => {
            return (
              <SetBox key={set.key} set={set} />
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
    sets: state.hashtagSets,
    selectedSet: state.selectedSet
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateSets: (sets) => {
      dispatch({
        type: 'UPDATE_SETS',
        sets: sets,
      })
    },
    onAddSet: (set) => {
      dispatch({
        type: 'ADD_SET',
        set: set
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HashtagSetsContainer);
