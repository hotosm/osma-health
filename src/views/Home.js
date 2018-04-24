import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeMap from '../components/HomeMap';
import HomeSelect from '../components/HomeSelect';
import PanelContainer from '../components/PanelContainer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelOpen: true
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(option) {
    if (option) {
      const urlFragment = option.value
      this.props.history.push(urlFragment);
    }
  }

  render() {
    const { boundaries } = this.props;

    return (
      <section className='page__body'>
        <div className='map'>
          <HomeMap boundaries={boundaries} />
          <PanelContainer>
            <div className='panel'>
              <div className='inner'>
                <div className='panel__header'>
                  <h1 className='panel__title'>HOT Analytics for Health</h1>
                  <p className='panel__description'>HOT Analytics for Health is focussed on helping measure progress and quality of map data of Malaria campaigns.</p>
                  <p className='panel__description'>
                    The report focuses on attribute completeness, edit recency, map completeness relative to population, and data errors like duplicate buildings and invalid geometries.
                  </p>
                </div>
                <div className='panel__body'>
                  <div className='panel__section'>
                    <div className='panel__form'>
                      <p className='form__label'>Select an area of interest to see the report.</p>
                      <HomeSelect boundaries={boundaries} handleChange={this.handleChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PanelContainer>
        </div>
      </section >
    );
  }
}

const mapStateToProps = state => {
  return {
    boundaries: state.AppState.boundaries
  }
}

export default connect(mapStateToProps)(Home);
