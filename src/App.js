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
        <header className='header'>
          <div className='inner'>
            <h1><a href='/'>HOT Analytics for Health</a></h1>
            <ul>
              <li><a href='/#/about'>About</a></li>
            </ul>
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
