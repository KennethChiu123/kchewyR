import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isYTLoaded, load as loadYT } from 'redux/modules/ytvideos';
import { isLoaded as isIGLoaded, load as loadIG } from 'redux/modules/igimages';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import configCustom from '../../config_custom';
import { asyncConnect } from 'redux-async-connect';

import fbImage from './../../../images/social-fb.png';
import igImage from './../../../images/social-instagram.png';
import twImage from './../../../images/social-twitter.png';
import ytImage from './../../../images/social-youtube.png';
import scImage from './../../../images/social-soundcloud.png';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isYTLoaded(getState())) {
      promises.push(dispatch(loadYT()));
    }
    if (!isIGLoaded(getState())) {
      promises.push(dispatch(loadIG()));
    }
    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  setNavExpanded = (expanded) => {
    this.setState({ navExpanded: expanded });
  };
  closeNav = () => {
    this.setState({ navExpanded: false });
  };

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop
        onToggle={this.setNavExpanded}
        expanded={this.state.navExpanded}>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{color: '#008000'}}>
                <div className={styles.brand}/>
                <span>{config.app.title}</span>
                <span> </span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar pullRight onSelect={this.closeNav}>
              <LinkContainer to="/bio">
                <NavItem eventKey={2}>Bio</NavItem>
              </LinkContainer>
              <LinkContainer to="/music">
                <NavItem eventKey={3}>Music</NavItem>
              </LinkContainer>
              <LinkContainer to="/social">
                <NavItem eventKey={4}>Social</NavItem>
              </LinkContainer>
              <LinkContainer to="/contact">
                <NavItem eventKey={5}>Contact</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <div className="well text-center">
          <nav className="social-footer">
              <ul className= "social-ul-footer ">
                  <li className= "first">
                      <a href={configCustom.app.home.facebook_href} >
                          <div>
                              <img src={fbImage} alt="Facebook" className="social-button" />
                          </div>
                      </a>
                  </li>

                  <li>
                      <a href={configCustom.app.home.twitter_href} >
                          <div>
                              <img src={twImage} alt="Twitter" className="social-button" />
                          </div>
                      </a>
                  </li>
                  <li>
                      <a href={configCustom.app.home.youtube_href} >
                          <div>
                              <img src={ytImage} alt="Youtube" className="social-button" />
                          </div>
                      </a>
                  </li>
                  <li>
                      <a href={configCustom.app.home.instagram_href} >
                          <div>
                              <img src={igImage} alt="Instagram" className="social-button" />
                          </div>
                      </a>
                  </li>
                  {/*
                  <li className= "last">
                      <a href={configCustom.app.home.spotify_href} >
                          <div>
                              <img src={spImage} alt="Spotify" className="social-button" />
                          </div>
                      </a>
                  </li>
                  */}
                  <li className= "last">
                      <a href={configCustom.app.home.soundcloud_href} >
                          <div>
                              <img src={scImage} alt="Soundcloud" className="social-button" />
                          </div>
                      </a>
                  </li>
              </ul>
          </nav>
        </div>
      </div>
    );
  }
}
