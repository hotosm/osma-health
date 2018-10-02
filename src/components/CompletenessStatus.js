import React from 'react';

const labels = {
  'good': {
    statusText: 'Good',
    infoText: 'OSM building coverage is good relative to population density.',
    color: 'good'
  },
  'fair': {
    statusText: 'Fair',
    infoText: 'OSM building coverage is fair relative to population density.',
    color: 'fair'
  },
  'poor': {
    statusText: 'Poor',
    infoText: 'OSM building coverage is poor relative to population density.',
    color: 'poor'
  }
}

export default ({ completenessPercentage, page }) => {
  let status = 'good';
  if (completenessPercentage < 0.5) {
    status = 'fair';
  }
  if (completenessPercentage < -0.5) {
    status = 'poor';
  }
  const {statusText, color} = labels[status];

  if (page === "home") {
    return (
      <div className={`report__status report__status--${color}`}>
        <p>{statusText} relative completeness</p>
      </div>
    );
  } else {
    return (
      <div className={`report__status report__status--${color}`}>
        <p className={`report__text--${color}`}>{statusText}</p>
      </div>
    );
  }

}
