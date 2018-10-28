import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavbarButton extends Component {
  render() {
    let selected = 'navbarButton';
    let route = "/";
    if(this.props.name === this.props.page) {
      selected = 'navbarButtonSelected';
    }
    if(this.props.name === "About") {
      route = "/about";
    }
    return (
      <div onClick={() => this.props.onChangePage(this.props.name)}>
        <Link className={selected} to={route}>{this.props.name}</Link>
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
