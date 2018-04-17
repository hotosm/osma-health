import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { featureCollection } from '@turf/helpers';
import bbox from '@turf/bbox';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q';

export default class HomeMap extends Component {
  constructor(props) {
    super(props);
    this.renderCountries = this.renderCountries.bind(this);
  }

  componentDidMount() {

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 3
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  renderCountries() {
    const { boundaries } = this.props;
    if (boundaries && boundaries.length > 0 && this.map) {
      const aois = featureCollection(boundaries);

      /**
       * This initialization is only called once
       * this is due to the fact that once we load the source
       * for boundaries, we check that it is already loaded and
       * skip it. 
       * If we need to modify the boundaries dynamically this will
       * have to be re-written
       */
      if (!this.map.getSource('aois')) {
        this.map.on('load', () => {
          this.map.addSource('aois', {
            'type': 'geojson',
            'data': aois
          });

          this.map.addLayer({
            'id': 'aoi-fill',
            'type': 'fill',
            'source': 'aois',
            'paint': {
              'fill-color': '#FCC074',
              'fill-opacity': 0.4
            }
          });

          this.map.addLayer({
            'id': 'aoi-line',
            'type': 'line',
            'source': 'aois',
            'paint': {
              'line-color': '#36414D',
              'line-opacity': 1,
              'line-width': 1,
            }
          });
          this.map.fitBounds(bbox(aois), {maxZoom: 6});
        })
      }
    }
  }

  render() {
    this.renderCountries();

    const style = {
      textAlign: 'left',
      height: '100%'
    };

    return <div style={style} ref={el => this.mapContainer = el} />;
  }
}