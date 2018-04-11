import React, { Component } from 'react';
import Report from './views/Report';

const COUNTRIES_URL = 'https://raw.githubusercontent.com/hotosm/osma-health-workers/master/countries.json';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      countries: {},
      selectedCountry: 'botswana',
      selectedAoi: 'MOTOPI',
    }
  }
  async componentWillMount () {
    const response = await fetch(COUNTRIES_URL);
    if (response.ok) {
      const data = await response.json();

      this.setState({
        countries: data,
        loading: false
      });
    }
  }

  render() {
    const {countries, selectedCountry, selectedAoi} = this.state;
    const countryKeys = Object.keys(countries);
    let aoi = undefined;
    if (countryKeys.length > 0 && selectedCountry && selectedAoi) {
      let country = countries[selectedCountry];
      aoi = country.features.filter(ft => ft.properties.name === selectedAoi)[0];
    }

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
        {aoi ? <Report aoi={aoi} />:<div></div> }
      </div>
    );
  }
}

export default App;
