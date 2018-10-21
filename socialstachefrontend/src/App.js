import React, { Component } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  render() {
    let page = <HomePage />;
    switch (this.props.page) {
      case "About": {
        //page = "About"
        page = <HomePage />
      }
      case "Viral Content": {
        //page = "Viral Content"
        page = <HomePage />
      }
      case "Hashtags": {
        page = <HomePage />
      }
      case "Templates": {
        page = <HomePage />
      }
      default: {
        page = <HomePage />
      }

    }
    return (
      <div className="App">
        <Navbar />
        {page}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.currentPage
  }
};

export default connect(mapStateToProps)(App);
