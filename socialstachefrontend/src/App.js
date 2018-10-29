import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import HashtagsPage from './pages/HashtagsPage';
import TemplatesPage from './pages/TemplatesPage';
import MediaFinderPage from './pages/MediaFinderPage';
import AboutPage from './pages/AboutPage';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route path={"/"} exact component={HomePage}/>
          <Route path={"/hashtags"} exact component={HashtagsPage} />
          <Route path={"/templates"} exact component={TemplatesPage} />
          <Route path={"/mediafinder"} exact component={MediaFinderPage} />
          <Route path={"/about"} exact component={AboutPage} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.currentPage
  }
};

export default connect(mapStateToProps)(App);
