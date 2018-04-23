import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { featureCollection } from '@turf/helpers';
import { withRouter } from 'react-router';
import bbox from '@turf/bbox';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q';

class HomeMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null
    }
    this.renderCountries = this.renderCountries.bind(this);
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/devseed/cjfvggcjha5ml2rmyy25i1vde',
      zoom: 3
    });

    this.map.on('load', () => {
      this.setState({
        map: this.map
      });
    });
  }

  componentWillUnmount() {
    console.log('unmount');
    this.map.remove();
  }

  renderCountries() {
    const { boundaries, history } = this.props;
    const { map } = this.state;

    if (boundaries && boundaries.length > 0 && map) {
      const aois = featureCollection(boundaries);

      /**
       * This initialization is only called once
       * this is due to the fact that once we load the source
       * for boundaries, we check that it is already loaded and
       * skip it. 
       * If we need to modify the boundaries dynamically this will
       * have to be re-written
       */
      if (!map.getSource('aois')) {
        map.addSource('aois', {
          'type': 'geojson',
          'data': aois
        });

        map.addLayer({
          'id': 'aoi-fill',
          'type': 'fill',
          'source': 'aois',
          'paint': {
            'fill-color': '#FCC074',
            'fill-opacity': 0.4
          }
        });

        map.on('click', 'aoi-fill', (e) => {
          const { country, id } = e.features[0].properties;
          history.push(`/${country}/${id}`);
        });

        map.on('mouseenter', 'aoi-fill', () => {
          map.getCanvas().style.cursor = 'pointer';
        });

        map.addLayer({
          'id': 'aoi-line',
          'type': 'line',
          'source': 'aois',
          'paint': {
            'line-color': '#36414D',
            'line-opacity': 1,
            'line-width': 1,
          }
        });
        map.fitBounds(bbox(aois), { maxZoom: 6 });
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

export default withRouter(HomeMap);