import React, { Component } from 'react';
import { connect } from 'react-redux';
import laptop from '../assets/laptop.png';

class HomePageFeatures extends Component {
  render() {
    return (
      <div className={"pageContainer"}>
        <div className={"whyContainer"}>
          <div className={"whyText"}>
            <div className={"whyTitle"}>Why SocialStache?</div>
            <div className={"whyBody"}>
              SocialStache provides tools that make branding on Instagram easier.
              Let us manage and suggest hashtags to reach new audiences and to boost
              your engagement. Let us find valuable content that your followers will
              enjoy. This all-in-one tool will make your life easier and will shorten
              the amount of time needed to manage your page.
            </div>
          </div>
          <div className={"whyImage"}>
            <img src={laptop} className={"image"} />
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
