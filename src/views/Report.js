import React, { Component } from 'react';
import {connect } from 'react-redux';
import ReportMap from '../components/ReportMap';

class Report extends Component {

  render() {
    const params = this.props.match.params;
    const { boundaries } = this.props;
    let aoi = null;

    if (boundaries.length > 0) {
      aoi = boundaries.filter(bnd => {
        return (
          bnd.properties.country === params.country && 
          bnd.properties.name === params.aoi
        );
      })[0];
    }

    return (
      <section className='page__body'>
        <div className='map'>
          {aoi ? <ReportMap aoi={aoi} /> : <div></div>}
          <div className='report__panel-container'>
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
                      <li>25<small>duplicated buildings</small></li>
                      <li>31%<small>positioning errors</small></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='report__panel-button'>
            <button className='button button--slide-close'></button>
          </div>
          </div>
        </div>
        <ul className='map__actions button--group'>
          <li><button className='button button--small button--primary-filled'>All AOIS</button></li>
          <li><button className='button button--small button--primary-filled'>Export Data</button></li>
        </ul>
        <div className='map__legend'>
          <p className='legend-label'>Date of OSM edit</p>
          <div className='legend-bar legend-bar-osm'></div>
          <div className='color-scale__container'>
            <p className='legend-label'>Completeness of Map</p>
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
              <p className='scale-number less'>Less Mapped</p>
              <p className='scale-number more'>More Mapped</p>
            </div>
          </div>
        </div>
      </section >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boundaries: state.AppState.boundaries
  }
}

export default connect(mapStateToProps)(Report);
