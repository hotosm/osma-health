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

    return (
      <section className='page__body'>
        <div className='map'>
          <HomeMap boundaries={boundaries} />
          <div className='report__panel-container'>
            <div className='report__panel'>
              <div className='inner'>
                <div className='report__header'>
                  <h1 className='report__title'>Select a boundary</h1>
                </div>
                <div className='report__body'>
                  <div className='report__section'>
                    <div className='report__section-header'>
                      <HomeSelect boundaries={boundaries} handleChange={this.handleChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='report__panel-button'>
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
