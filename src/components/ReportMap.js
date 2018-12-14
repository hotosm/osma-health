import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import centerOfMass from '@turf/center-of-mass';
import * as d3Scale from 'd3-scale';
import * as d3Chromatic from 'd3-scale-chromatic';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q';

export default class ReportMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layer: 'Default',
      switchImg: 'images/sat.jpg'
    }
    this.map = null;
  }
  componentDidMount() {
    const center = centerOfMass(this.props.aoi).geometry.coordinates;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/devseed/cjfvggcjha5ml2rmyy25i1vde',
      zoom: 9,
      center
    });
    this.map.addControl(
      new mapboxgl.NavigationControl({showCompass: false}),
      'bottom-right'
    );

    this.map.on('load', () => {
      this.addDataToMap();
      this.map.on('zoomend', () => {
        const z = this.map.getZoom();
        this.props.onZoom(z);
      });
    });
  }

  componentWillUnmount(){
    this.map.remove();
  }

  addDataToMap() {
    let scale = d3Scale.scaleQuantile()
    .domain(this.props.domain)
    .range(d3Chromatic.schemeRdYlGn[9])

    const stops = scale.quantiles().map( value => {
      return [value, scale(value)]
    });
    const aoi = this.props.aoi;
    if (aoi && this.props.domain && this.map) {
      // prepare a quantile scale with the domain of predictions.
      if (!this.map.getSource('aoi')){
        this.map.addSource('aoi', {
          'type': 'geojson',
          'data': aoi
        });
      }

      if (!this.map.getSource('buildings-osm')){
        this.map.addSource('buildings-osm', {
          type: 'vector',
          url: 'mapbox://devseed.9lcaji8y'
        });
      }

      if (!this.map.getSource('completeness')){
        this.map.addSource('completeness', {
          type: 'vector',
          url: `mapbox://hot.${this.props.country}-completeness`
        })
      }

      if (!this.map.getLayer('completeness')) {
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
          "filter": [">", "index", -1]
        })
      }

      if (!this.map.getLayer('aoi-line')) {
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
      }

      if (!this.map.getLayer('buildings-osm')) {
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
        });
      }
    }
  }

  switchBaseLayer() {
    if (this.state.layer === 'Default') {
      this.setState({layer: 'Satellite'});
      this.setState({switchImg: 'images/streets.png'});
      this.map.setStyle('mapbox://styles/mapbox/satellite-v9');
    } else {
      this.setState({layer: 'Default'});
      this.setState({switchImg: 'images/sat.jpg'});
      this.map.setStyle('mapbox://styles/devseed/cjfvggcjha5ml2rmyy25i1vde');
    }
    this.map.on('styledata', () => {
      this.addDataToMap();
    });
  }

  render () {
    const style = {
      textAlign: 'left',
      height: '100%'
    };

    return <div style={style} ref={el => this.mapContainer = el}>
              <div className='map__layer-switch' onClick={e => this.switchBaseLayer()}>
                <div className='map__layer-switch-img'>
                  <img src={this.state.switchImg} alt="base map switcher"/>
                </div>
                <div className='map__layer-switch-info'>
                  <p>View</p>
                  <h4>{this.state.layer}</h4>
                </div>
              </div>
           </div>;
  }
}
