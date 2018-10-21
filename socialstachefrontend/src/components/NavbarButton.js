import React, { Component } from 'react';
import { connect } from 'react-redux';

class NavbarButton extends Component {
  render() {
    let selected = 'navbarButton';
    if(this.props.name === this.props.page) {
      selected = 'navbarButtonSelected';
    }
    return (
      <div className={selected} onClick={() => this.props.onChangePage(this.props.name)}>
        {this.props.name}
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
