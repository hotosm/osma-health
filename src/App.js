import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCountries } from './state/AppState';
import { HashRouter as Router, Route } from 'react-router-dom';

import { Header } from './components/Header';
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
          <Header />
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
