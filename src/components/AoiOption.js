import React from 'react';
import upperFirst from 'lodash.upperfirst';
import CompletenessStatus from '../components/CompletenessStatus';


export class AoiOption extends React.PureComponent {
  render() {
    const {country, name, id} = this.props.aoi.properties;
    const completeness = this.props.stats ? this.props.stats[`${country}_${id}`] : undefined;
    return(
      <div className="aoi-list-item grid-wrapper" onClick={e => this.props.history.push(`/${country}/${id}`)}>
        <div className="aoi-list-item-detail">
          <h1>{upperFirst(country)}: {name}</h1>
          {
            completeness !== undefined &&
            <CompletenessStatus completenessPercentage={completeness} page={"home"} />
          }
        </div>
        <div className="aoi-list-arrow">
          <button className="button button--slide-open" />
        </div>

      </div>
    );
  }
}
