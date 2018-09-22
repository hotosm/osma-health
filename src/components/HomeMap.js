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
      map: null,
      layer: 'Default',
      switchImg: 'images/sat.jpg'
    }
    this.map = null;
    this.renderCountries = this.renderCountries.bind(this);
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: `mapbox://styles/devseed/cjfvggcjha5ml2rmyy25i1vde`,
      zoom: 3
    });

    this.map.addControl(
      new mapboxgl.NavigationControl({showCompass: false}),
      'bottom-right'
    );
    this.map.on('load', () => {
      this.renderCountries();
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.filterParams !== prevProps.filterParams) {
      this.renderCountries();
    }
  }

  componentWillUnmount() {
    this.map.remove();
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
      this.renderCountries();
    });
  }

  renderCountries() {
    const { boundaries, history } = this.props;

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

        this.map.on('click', 'aoi-fill', (e) => {
          const { country, id } = e.features[0].properties;
          history.push(`/${country}/${id}`);
        });

        this.map.on('mouseenter', 'aoi-fill', () => {
          this.map.getCanvas().style.cursor = 'pointer';
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
        this.map.fitBounds(bbox(aois), { maxZoom: 6 });
      }
    }
  }

  render() {

    const style = {
      textAlign: 'left',
      height: '100%'
    };

    return <div style={style} ref={el => this.mapContainer = el} >
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

export default withRouter(HomeMap);
