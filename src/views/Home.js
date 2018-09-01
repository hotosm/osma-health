import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeMap from '../components/HomeMap';
import { AoiOption } from '../components/AoiOption';
import PanelContainer from '../components/PanelContainer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelOpen: true
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(option) {
    if (option) {
      const urlFragment = option.value
      this.props.history.push(urlFragment);
    }
  }

  render() {
    const { boundaries, history } = this.props;

    return (
      <section className='page__body'>
        <div className='map'>
          <HomeMap boundaries={boundaries} />
          <PanelContainer>
            <div className='panel'>
              <div className='inner'>
                <div className='panel__header'>
                  <h1 className='panel__title'>HOT Analytics for Health</h1>
                  <p className='panel__description'>HOT Analytics for Health is focussed on helping measure progress and quality of map data of Malaria campaigns.</p>
                  <p className='panel__description'>
                    The report focuses on attribute completeness, edit recency, map completeness relative to population, and data errors like duplicate buildings and invalid geometries.
                  </p>
                </div>
                <hr />
                <div className='panel__body'>
                  <div className='panel__section'>
                    <div className='panel__form'>
                      <p className='panel__description'>Reports</p>
                      <div className='panel__aoi__list'>
                        <div className='panel__aoi__list__content'>
                          {boundaries.map((item, n) =>
                            <AoiOption aoi={item} history={history} key={n} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PanelContainer>
          <div className='map__legend'>
            <div className='color-scale__container'>
                <p className='legend-label'>Completeness</p>
                <ul className='color-scale'>
                  <li className='color-scale__item'></li>
                  <li className='color-scale__item'></li>
                  <li className='color-scale__item'></li>
                  <li className='color-scale__item'></li>
                  <li className='color-scale__item'></li>
                  <li className='color-scale__item'></li>
                  <li className='color-scale__item'></li>
                  <li className='color-scale__item'></li>
                </ul>
                <div className='scale-labels'>
                  <p className='scale-number-bad less'>Bad</p>
                  <p className='scale-number-good more'>Good</p>
                </div>
            </div>
            {
              (this.state.mapZoom > 12) ?
              <div className='recency-scale__container'>
                <p className='legend-label'>OSM Edit Recency</p>
                <div className='legend-bar legend-bar-osm'></div>
              </div>
              : <div></div>

            }
          </div>
        </div>
      </section >
    );
  }
}

const mapStateToProps = state => {
  return {
    boundaries: state.AppState.boundaries
  }
}

export default connect(mapStateToProps)(Home);
