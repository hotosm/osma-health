import React from 'react';
import infoIcon from '../graphics/icons/circle-information.svg';

const labels = {
  'good': {
    statusText: 'Good',
    infoText: 'OSM building coverage is good relative to population density.',
    color: 'report__status--good'
  },
  'average': {
    statusText: 'Average',
    infoText: 'OSM building coverage is average relative to population density.',
    color: 'report__status--good'
  },
  'poor': {
    statusText: 'Poor',
    infoText: 'OSM building coverage is poor relative to population density.',
    color: 'report__status--bad'
  }
}

export default ({ completenessPercentage }) => {
  let status = 'good';
  if (completenessPercentage < 0.5) {
    status = 'average';
  }
  if (completenessPercentage < -0.5) {
    status = 'poor';
  } 
  const {infoText, statusText, color} = labels[status];
  
  return (
    <div className={`report__status ${color}`}>
      <div className='inner'>
        <p> AOI Relative Completeness: {statusText}</p>
        <button className='button button--info'>
          <img alt='information' height='16' width='16' src={infoIcon} />
          <div className="info-text">
            <span>{infoText}</span>
          </div>
        </button>
      </div>
    </div>
  );

}
