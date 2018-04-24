import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCountries } from './state/AppState';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

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
          <header className="page__header">
            <div className='inner'>
              <div className='page__headline'>
                <h1 className='page__title heading--xsmall'><Link to="/">OSM Analytics for Health</Link></h1>
              </div>
              <nav className='page__nav'>
                <ul className='nav__menu'>
                  <a href='/#/about'><li>About</li></a>
                </ul>
              </nav>
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
