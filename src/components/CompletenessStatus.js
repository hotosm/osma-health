import React from 'react';
import infoIcon from '../graphics/icons/circle-information.svg';

const labels = {
  'good': {
    statusText: 'Great',
    infoText: 'OSM coverage is better than what population density would imply',
    color: 'report__status--good'
  },
  'ok': {
    statusText: 'Good',
    infoText: 'OSM coverage is similar to what population density would imply',
    color: 'report__status--good'
  },
  'bad': {
    statusText: 'Bad',
    infoText: 'OSM coverage is worse than what population density would imply',
    color: 'report__status--bad'
  }
}

export default ({ completenessPercentage }) => {
  let status = 'good';
  if (completenessPercentage < 0.5) {
    status = 'ok';
  }
  if (completenessPercentage < -0.5) {
    status = 'bad';
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
