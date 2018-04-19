import React, { Component } from 'react';
import {connect } from 'react-redux';
import ReportMap from '../components/ReportMap';
import {requestBoundary} from '../state/ReportState';
import numeral from 'numeral';
import {format} from 'date-fns';

class Report extends Component {
  constructor (props) {
    super(props); 
    const { country, aoi } = this.props.match.params;
    this.props.getStats(country, aoi);
  }

  render() {
    const { country, aoi } = this.props.match.params;
    const { boundaries, stats } = this.props;

    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1); 

    let layer = null;
    if (boundaries.length > 0) {
      layer = boundaries.filter(bnd => {
        return (
          bnd.properties.country === country && 
          bnd.properties.id === aoi
        );
      })[0];
    }

    if (!stats) return <div></div>; //FIXME Should return loading indicator
    
    const {
      buildingResidential, 
      buildingResidentialIncomplete,
      duplicateCount,
      totalBuildings,
      untaggedWays
    } = stats['building-stats'];

    const timestamp = stats.timestamp;

    // Stats calculation
    const numberUntaggedWays = numeral(untaggedWays);
    const numberBuildings = numeral(totalBuildings);
    const numberResidential = numeral(buildingResidential);
    const percentResidentialBuildings = numeral(numberResidential / numberBuildings);
    const percentCompleteBuildings = numeral((numberResidential - numeral(buildingResidentialIncomplete))/ numberBuildings);
    const numberDuplicates = numeral(duplicateCount);

    return (
      <section className='page__body'>
        <div className='map'>
          {layer ? <ReportMap aoi={layer} /> : <div></div>}
          <div className='report__panel-container'>
            <div className='report__panel'>
            <div className='report__status report__status--good'>
              <div className='inner'>
                <p> AOI OSM Data Status: Good </p>
              </div>
            </div>
            <div className='inner'>
              <div className='report__actions'>
                <p className='note'>Report last updated {format(timestamp, 'MMM. D, YYYY')}</p>
                <button className='button button--small button--base-bounded'>Download Report</button>
              </div>
              <div className='report__header'>
                <h1 className='report__title'>{capitalize(aoi)} District</h1>
                <ul className='report__meta'>
                  <li>{capitalize(country)}</li>
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
                  </div>
                  <div className='report__section-body'>
                    <p><strong>{numberBuildings.format('0,0')} </strong><small>OSM buildings in this AOI</small></p>
                    <ul className='stat-list'>
                      <li>{numberUntaggedWays.format('0,0')}<small>untagged closeways</small></li>
                      <li>{percentResidentialBuildings.format('0%')}<small>residential buildings</small></li>
                      <li>{percentCompleteBuildings.format('0%')}<small>residential buildings with roof and wall tags</small></li>
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
                      <li>{numberDuplicates.format('0,0')}<small>duplicated buildings</small></li>
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
        </div>
      </section >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boundaries: state.AppState.boundaries,
    stats: state.ReportState.stats
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStats: (...args) => dispatch(requestBoundary(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);
