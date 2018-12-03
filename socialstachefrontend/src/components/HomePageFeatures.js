import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomePageFeatures extends Component {
  render() {
    return (
        <div className={"pageContainer"}>
          <div className={"features"}>
            <div className={"feature"}>
              <img
                src="https://png.icons8.com/wired/128/222222/activity-feed.png"
                alt={"Activity Feed Icon"}
              />
              <div className={"featureTitle"}> Hashtag Sets </div>
              <div className={"featureBody"}>
                Create unlimited hashtag sets that help you reach a greater audience
              </div>
            </div>
            <div className={"feature"}>
              <img
                src="https://png.icons8.com/wired/128/222222/template.png"
                alt={"Template Icon"}
              />
              <div className={"featureTitle"}>Caption Templates</div>
              <div className={"featureBody"}>
                Store frequently used captions, and have your hashtags auto-generated
              </div>
            </div>
            <div className={"feature"}>
              <img
                src="https://png.icons8.com/wired/128/222222/search.png"
                alt={"Search Icon"}
              />
              <div className={"featureTitle"}>Engaging Content</div>
              <div className={"featureBody"}>
                Utilize tools to find engaging content from your favorite creators
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePageFeatures);
