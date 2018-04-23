import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ReportMap from '../components/ReportMap';
import ReportEditsChart from '../components/ReportEditsChart';
import {requestBoundary} from '../state/ReportState';
import numeral from 'numeral';
import {format} from 'date-fns';
import upperFirst from 'lodash.upperfirst';

class Report extends Component {
  constructor (props) {
    super(props); 
    const { country, aoi } = this.props.match.params;
    this.props.getStats(country, aoi);
  }

  render() {
    const { country, aoi } = this.props.match.params;
    const { boundaries, stats, domain } = this.props;

    let layer = null;
    if (boundaries.length > 0) {
      layer = boundaries.filter(bnd => {
        return (
          bnd.properties.country === country && 
          bnd.properties.id === aoi
        );
      })[0];
    }

    if (!stats || !domain || !layer) return <div></div>; //FIXME Should return loading indicator
    
    const {
      buildingResidential, 
      buildingResidentialIncomplete,
      duplicateCount,
      totalBuildings,
      untaggedWays,
      population

    } = stats['building-stats'];

    const timestamp = stats.timestamp;
    const timeBins = stats['time-bins'];

    // Stats calculation
    const numberUntaggedWays = numeral(untaggedWays);
    const numberBuildings = numeral(totalBuildings);
    const numberResidential = numeral(buildingResidential);
    const numberBuildingResidentialIncomplete = numeral(buildingResidentialIncomplete)
    const percentResidentialBuildings = numeral(numberResidential.value() / numberBuildings.value());
    const percentCompleteBuildings = numeral((numberResidential.value() - numberBuildingResidentialIncomplete.value()) / numberBuildings.value());
    const numberDuplicates = numeral(duplicateCount);
    const estimatePopulation = numeral(population)

    return (
      <section className='page__body'>
        <div className='map'>
          {<ReportMap aoi={layer} domain={domain}/>}
          <div className='report__panel-container'>
            <div className='report__panel'>
            <div className='report__status report__status--good'>
              <div className='inner'>
                <p> AOI Relative Completeness: Good </p>
                <button className='button button--info'></button>
              </div>
            </div>
            <div className='inner'>
              <div className='report__actions'>
                <p className='note'>Report last updated {format(timestamp, 'MMM. D, YYYY')}</p>
                <button className='button button--small button--base-bounded'>Download Report</button>
              </div>
              <div className='report__header'>
                <h1 className='report__title'>{upperFirst(aoi)} District</h1>
                <ul className='report__meta'>
                  <li>{upperFirst(country)}</li>
                  <li>Est. Population {estimatePopulation.format('0,0')}</li>
                </ul>
              </div>
              <div className='report__body'>
                <div className='report__section'>
                  <div className='report__section-header'>
                    <h2 className='report__section-title'>Attribute Completeness</h2>
                  </div>
                  <div className='report__section-body'>
                    <p>{numberBuildings.format('0,0')}<small>OSM buildings in this AOI</small></p>
                    <ul className='stat-list'>
                      <li>{numberUntaggedWays.format('0,0')}<small>untagged closeways</small></li>
                      <li>{percentResidentialBuildings.format('0.00%')}<small>residential buildings</small></li>
                      <li>{percentCompleteBuildings.format('0.00%')}<small>residential buildings with roof and wall tags</small></li>
                    </ul>
                  </div>
                </div>
                <div className='report__section'>
                  <div className='report__section-header'>
                    <h2 className='report__section-title'>Temporal Accuracy</h2>
                  </div>
                  <div className='report__section-body'>
                    <ReportEditsChart timeBins={timeBins} />
                  </div>
                </div>
                <div className='report__section'>
                  <div className='report__section-header'>
                    <h2 className='report__section-title'>Data Errors</h2>
                  </div>
                  <div className='report__section-body'>
                    <ul className='stat-list'>
                      <li>{numberDuplicates.format('0,0')}<small>duplicate buildings</small></li>
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
          <li><Link to="/" className='button button--small button--primary-filled'>All AOIS</Link></li>
        </ul>
        <div className='map__legend'>
          <p className='legend-label'>OSM Edit Recency</p>
          <div className='legend-bar legend-bar-osm'></div>
          <div className='color-scale__container'>
            <p className='legend-label'>Map Completeness</p>
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
              <p className='scale-number less'>poor</p>
              <p className='scale-number more'>good</p>
            </div>
          </div>
        </div>
      </section >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boundaries: state.AppState.boundaries,
    stats: state.ReportState.stats,
    domain: state.ReportState.domain
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStats: (...args) => dispatch(requestBoundary(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);
