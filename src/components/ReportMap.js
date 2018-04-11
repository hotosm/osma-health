import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import centerOfMass from '@turf/center-of-mass';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q';

export default class ReportMap extends Component {
  componentDidMount() {
    const aoi = this.props.aoi;
    const center = centerOfMass(aoi).geometry.coordinates;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 12,
      center
    });

    this.map.on('load', () => {
      this.map.addSource('aoi', {
        'type': 'geojson',
        'data': aoi
      });

      this.map.addSource('buildings-osm', {
        type: 'vector',
        url: 'mapbox://devseed.9lcaji8y'
      });

      this.map.addLayer({
        'id': 'buildings-osm',
        type: 'fill',
        source: 'buildings-osm',
        'source-layer': 'osm',
        'paint': {
          'fill-color': '#00f',
          'fill-opacity': 1
        }
      })


      this.map.addLayer({
        'id': 'aoi-fill',
        'type': 'fill',
        'source': 'aoi',
        'paint': {
          'fill-color': '#088',
          'fill-opacity': 0.1
        }
      });

      this.map.addLayer({
        'id': 'aoi-line',
        'type': 'line',
        'source': 'aoi',
        'paint': {
          'line-color': '#088',
          'line-opacity': 1,
          'line-dasharray': [4, 2],
          'line-width': 2,
        }
      });

    });
  }
  componentWillUnmount(){
    this.map.remove();
  }

  render () {
    const style = {
      textAlign: 'left',
      height: '100%'
    };

    return <div style={style} ref={el => this.mapContainer = el} />;
  }
}