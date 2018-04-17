import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import centerOfMass from '@turf/center-of-mass';
import * as d3Scale from 'd3-scale';
import * as d3Chromatic from 'd3-scale-chromatic';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q';

export default class ReportMap extends Component {
  componentDidMount() {
    const aoi = this.props.aoi;
    const center = centerOfMass(aoi).geometry.coordinates;

    // prepare a quantile scale with the domain of predictions.
    // FIXME: pull this from the state after making the request.
    const domain = [-0.15648712158203126,null,-0.0090380859375,-0.12646430969238281,56.63306005605589,-0.11232323583895265,1.6757894003954703,0.3317178462464132,-0.03782042391598225,0.010066604614257813,-1.9920689819008113,-0.049745484713850346,-0.06433882582533684,-0.031151674782357617,-0.1331780805438757,-0.015605087280273438,-0.007923650105794308,-0.10397700875997544,3.7887282360087875,-0.07405687756836414,5.052815860429752,-0.02606178283691406,-0.11898829329321912,-0.015171614140272141,-0.009050202593207358,-0.18486768404963513,2.5465808646082877,0.008765937387943267,-0.038527599945664404,-0.14065575745356299,-0.032240487549435384,3.440176126758258,2.412643786794261,-0.009041659757494927,-0.08025503177835504,0.16064708824727675,1.4111497915944744,-0.025670028924942016,21.904754446651058,-0.015593874901533127,-0.4236965298652649,-0.045301826819777485,-0.31547676663701024,-0.009042233005166054,1.0479763976659846]

    let scale = d3Scale.scaleQuantile()
      .domain(domain)
      .range(d3Chromatic.schemeRdYlGn[9])

    const stops = scale.quantiles().map( value => {
        console.log(scale(-0.03782042391598225));
      return [value, scale(value)]
    });

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
        }
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