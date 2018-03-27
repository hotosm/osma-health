import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className="page__header">
          <div className='inner'>
            <div className='page__headline'>
              <h1 className='page__title heading--xsmall'>OSM Analytics for Health</h1>
            </div>
            <nav className='page__nav'>
              <ul className='nav__menu'>
                <li>About</li>
              </ul>
            </nav>
          </div>
        </header>
        <section className='page__body'>
          <div className='map'>
            <div className='report__panel'>
            <div className='report__status report__status--good'>
              <div className='inner'>
                <p> AOI OSM Data Status: Good </p>
              </div>
            </div>
              <div className='inner'>
                <div className='report__actions'>
                  <p className='note'>Report last updated 3/12/18</p>
                  <button className='button button--small button--base-bounded'>Download Report</button>
                </div>
                <div className='report__header'>
                  <h1 className='report__title'>Ghanzi District</h1>
                  <ul className='report__meta'>
                    <li>Botswana</li>
                    <li>Est. Population 1,343</li>
                  </ul>
                </div>
                <div className='report__body'>
                  <div className='report__section'>
                    <div className='report__section-header'>
                      <h2 className='report__section-title'>Relative Completeness</h2>
                    </div>
                  </div>
                  <div className='report__section'>
                    <div className='report__section-header'>
                      <h2 className='report__section-title'>Attribute Completeness</h2>
                      <p className='note'>75% Completeness</p>
                    </div>
                    <div className='report__section-body'>
                    <p><strong>15 </strong><small>OSM buildings in this AOI</small></p>
                      <ul className='stat-list'>
                        <li>15%<small>untagged closeways</small></li>
                        <li>31%<small>residential buildings</small></li>
                        <li>75%<small>residential buildings with roof and wall tags</small></li>
                      </ul>
                    </div>
                  </div>
                  <div className='report__section'>
                    <div className='report__section-header'>
                      <h2 className='report__section-title'>Temporal Accuracy</h2>
                      <p className='note'>Last Edit: 3/2/2018 3:30pm</p>
                    </div>
                  </div>
                  <div className='report__section'>
                    <div className='report__section-header'>
                      <h2 className='report__section-title'>Data Errors</h2>
                    </div>
                    <div className='report__section-body'>
                      <ul className='stat-list'>
                        <li>25<small>dupliated buildings</small></li>
                        <li>31%<small>positioning errors</small></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
