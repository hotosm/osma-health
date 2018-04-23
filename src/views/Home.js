import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeMap from '../components/HomeMap';
import HomeSelect from '../components/HomeSelect';

class Home extends Component {
  constructor(props) {
    super(props);

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
    console.log('rendering', boundaries);

    return (
      <section className='page__body'>
        <div className='map'>
          <HomeMap boundaries={boundaries} />
          <div className='panel-container'>
            <div className='panel'>
              <div className='inner'>
                <div className='panel__header'>
                  <h1 className='panel__title'>HOT Malaria Analytics Tool</h1>
                  <p className='panel__description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a volutpat lectus. Praesent sollicitudin varius scelerisque. Nam nibh libero, malesuada ac ex id, semper cursus felis</p>
                </div>
                <div className='panel__body'>
                  <div className='panel__section'>
                    <div className='panel__form'>
                      <p className='form__label'>Search for an Area to see Analytics.</p>
                      <HomeSelect boundaries={boundaries} handleChange={this.handleChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='panel-button'>
              <button className='button button--slide-close'></button>
            </div>
          </div>
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
