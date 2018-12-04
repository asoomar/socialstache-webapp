import React, { Component } from 'react';
import { connect } from 'react-redux';

class AboutPageInfo extends Component {
  render() {
    return (
      <div className={"pageContainer"} style={{backgroundColor: "#EEEEEE", paddingBottom: "200px"}}>
        <div className={"aboutwho"}>
          The Team
        </div>
        <div className={"aboutCardsContainer"}>
          <div className={"aboutCardContainer"}>
            <div className={"aboutCard"}>
              <img
                className={"aboutCardPhoto"}
                src="https://www.kelsallsteele.co.uk/wp-content/uploads/2013/06/facebook-default-no-profile-pic.jpg"
                alt={"Aaron Li Profile"}
              />
              <div className={"aboutCardTitle"}>Aaron Li</div>
              <div className={"aboutCardBody"}>
                Senior at The University of Texas at Austin
              </div>
              <div className={"aboutCardBody"}>
                Electrical and Computer Engineering
              </div>
            </div>
          </div>
          <div className={"aboutCardContainer"}>
            <div className={"aboutCard"}>
              <img
                className={"aboutCardPhoto"}
                src="https://scontent-dfw5-1.xx.fbcdn.net/v/t1.0-1/c0.33.320.320a/p320x320/47322752_1985174234905730_4722772263751909376_n.jpg?_nc_cat=111&_nc_ht=scontent-dfw5-1.xx&oh=ce520234c5740a9809b52bbdf03183a5&oe=5C69A448"
                alt={"Ali Soomar Profile"}
              />
              <div className={"aboutCardTitle"}>Ali Soomar</div>
              <div className={"aboutCardBody"}>
                Junior at The University of Texas at Austin
              </div>
              <div className={"aboutCardBody"}>
                Electrical and Computer Engineering
              </div>
            </div>
          </div>
          <div className={"aboutCardContainer"}>
            <div className={"aboutCard"}>
              <img
                className={"aboutCardPhoto"}
                src="https://avatars2.githubusercontent.com/u/18043871?s=460&v=4"
                alt={"Rahul Sharma Profile"}
              />
              <div className={"aboutCardTitle"}>Rahul Sharma</div>
              <div className={"aboutCardBody"}>
                Senior at The University of Texas at Austin
              </div>
              <div className={"aboutCardBody"}>
                Electrical and Computer Engineering
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutPageInfo);
