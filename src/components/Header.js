import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'


class Header extends React.Component {

  render() {
    const { match, location, history } = this.props;
    return(
      <header className='page__header'>
        <div className='page__header-inner'>
          <a className='project__name-link' href='/'><h1>HOT Analytics for Health</h1></a>
          <div className='page__header__links'>
            <a className={this.props.location.pathname === '/' ? `active` : `inactive`} href='/'>
              Reports
            </a>
            <a className={this.props.location.pathname === '/about' ? `active` : `inactive`} href='/#/about'>
              About the project
            </a>
          </div>
          <div className='page__header-hot-logo'>
            <span>Supported by: </span>
            <a href='https://hotosm.org' target='_blank' rel="noopener noreferrer">
              <img src='images/logo.png' alt='HOT logo' />
            </a>
          </div>
        </div>
      </header>
    );
  }
}

Header = withRouter(Header);
export {Header};
