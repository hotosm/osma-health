import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCountries } from './state/AppState';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

/* Views */
import Report from './views/Report';
import Home from './views/Home';

class App extends Component {

  componentWillMount () {
    // Dispatch fetch countries
    this.props.requestCountries();
  }

  render() {
    const countries = this.props.countries;

    return (
      <Router>
        <div className='App'>
          <header className="page__header">
            <div className='inner'>
              <div className='page__headline'>
                <h1 className='page__title heading--xsmall'><Link to="/">OSM Analytics for Health</Link></h1>
              </div>
              <nav className='page__nav'>
                <ul className='nav__menu'>
                  <li>About</li>
                </ul>
              </nav>
            </div>
          </header>
           <Route exact path="/" component={Home} />
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
