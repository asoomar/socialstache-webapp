import React, { Component } from 'react';
import { connect } from 'react-redux';
import AboutPageInfo from '../components/AboutPageInfo';

class AboutPage extends Component {
  componentDidMount() {
    this.props.onChangePage("About");
  };
  render() {
    return (
      <div className={"Page"} style={{backgroundColor: "#EEEEEE"}}>
        <div className="HomePageHeader">
          <div className={"pageContainer"}>
            <div className={"TitleContent"}>
              Our Mission
            </div>
            <div className={"SubtitleContent"}>
              To create stronger relationships between businesses and customers
            </div>
          </div>
        </div>
        <AboutPageInfo />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.currentPage
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
