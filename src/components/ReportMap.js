import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import centerOfMass from '@turf/center-of-mass';
import * as d3Scale from 'd3-scale';
import * as d3Chromatic from 'd3-scale-chromatic';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q';

export default class ReportMap extends Component {
  componentDidMount() {
    const aoi = this.props.aoi;
    const domain = this.props.domain;
    const center = centerOfMass(aoi).geometry.coordinates;

    // prepare a quantile scale with the domain of predictions.
    let scale = d3Scale.scaleQuantile()
      .domain(domain)
      .range(d3Chromatic.schemeRdYlGn[9])

    const stops = scale.quantiles().map( value => {
      return [value, scale(value)]
    });

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/devseed/cjfvggcjha5ml2rmyy25i1vde',
      zoom: 9,
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

      this.map.addSource('completeness', {
        type: 'vector',
        url: 'mapbox://hot.botswana-completeness'

      })

      this.map.addLayer({
        'id': 'completeness',
        type: 'fill',
        source: 'completeness',
        'source-layer': 'completeness',
        paint: {
          'fill-color': {
            'property': 'index',
            'stops': stops
          },
          'fill-opacity': {
        "stops": [
            [1, 0.5],
            [12, 0.3],
            [14, 0.05]
            ]
          }
        },
        "filter": ["has", "index"]
      })

      this.map.addLayer({
        'id': 'aoi-line',
        'type': 'line',
        'source': 'aoi',
        'paint': {
          'line-color': '#36414D',
          'line-opacity': 1,
          'line-width': 2,
        }
      });

      this.map.addLayer({
        'id': 'buildings-osm',
        type: 'fill',
        source: 'buildings-osm',
        'source-layer': 'osm',
        paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['number', ['get', '@timestamp']],
              Math.floor(new Date('2016-1-01')/1000), 'rgba(54, 66, 77, 0.1)',
              Math.floor(new Date()/1000), 'rgba(54, 66, 77, 1)',
            ],
            'fill-outline-color': 'rgba(255, 255, 255, 0.1)'
          },
      })

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