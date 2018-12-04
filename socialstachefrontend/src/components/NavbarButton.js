import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavbarButton extends Component {
  render() {
    let selected = 'navbarButton';
    let route = "";
    if(this.props.name === this.props.page) {
      selected = 'navbarButtonSelected';
    }
    if(this.props.name === "About") {
      route = "/about";
    } else if (this.props.name === "Hashtags") {
      route = "/hashtags"
    } else if (this.props.name === "Templates") {
      route = "/templates"
    } else if (this.props.name === "Media Finder") {
      route = "/mediafinder"
    }
    return (
      <div>
        <Link className={selected} to={route} onClick={() => this.props.onChangePage(this.props.name)}>
          {this.props.name}
        </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavbarButton);
