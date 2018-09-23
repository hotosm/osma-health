import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCountries } from './state/AppState';
import { HashRouter as Router, Route } from 'react-router-dom';

/* Views */
import Report from './views/Report';
import Home from './views/Home';
import About from './views/About';

class App extends Component {

  componentWillMount () {
    // Dispatch fetch countries
    this.props.requestCountries();
  }

  render() {
    return (
      <Router>
        <div className='App'>
            <header className='page__header'>
              <div className='page__header-inner'>
                <a className='project__name-link' href='/'><h1>HOT Analytics for Health</h1></a>
                <div className='page__header__links'>
                  <a href='/'>Reports</a>
                  <a href='/#/about'>About the project</a>
                </div>
                <div className='page__header-hot-logo'>
                  <span>Supported by: </span>
                  <a href='https://hotosm.org' target='_blank' rel="noopener noreferrer">
                    <img src='images/logo.png' alt='HOT logo' />
                  </a>
                </div>

              </div>
            </header>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route path="/:country/:aoi" component={Report} />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestCountries: () => dispatch(requestCountries())
  }
}

export default connect(null, mapDispatchToProps)(App);
