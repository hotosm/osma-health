import React, { Component } from 'react';

export default class PanelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelOpen: true
    }

    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel() {
    this.setState({
      panelOpen: !this.state.panelOpen
    });
  }


  render() {
    return (
      <div className={`report__panel-container ${this.state.panelOpen ? 'report__panel-container--open' : 'report__panel-container--closed'}`}>
        {this.props.children}
        <div className='report__panel-button' >
          <button className={`button ${this.state.panelOpen ? 'button--slide-close' : 'button--slide-open'}`} onClick={this.togglePanel} />
        </div>
      </div>
    )
  }
}