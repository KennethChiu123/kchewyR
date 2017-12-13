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

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
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
            <Nav navbar pullRight>

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
                      <a href="https://www.facebook.com/amanda.carson.9847/" >
                          <div>
                              <img src={fbImage} alt="Facebook" className="social-button" />
                          </div>
                      </a>
                  </li>

                  <li>
                      <a href="https://twitter.com/#!/a_onthemoon" >
                          <div>
                              <img src={twImage} alt="Twitter" className="social-button" />
                          </div>
                      </a>
                  </li>
                  <li>
                      <a href="http://www.youtube.com/user/amandacarsonmusic" >
                          <div>
                              <img src={ytImage} alt="Youtube" className="social-button" />
                          </div>
                      </a>
                  </li>
                  <li>
                      <a href="http://instagram.com/amandaonthemoon" >
                          <div>
                              <img src={igImage} alt="Instagram" className="social-button" />
                          </div>
                      </a>
                  </li>
                  {/*
                  <li className= "last">
                      <a href="https://play.spotify.com/artist/2BHswvFd8tMBizVWGcAMLm" >
                          <div>
                              <img src={spImage} alt="Spotify" className="social-button" />
                          </div>
                      </a>
                  </li>
                  */}
                  <li className= "last">
                      <a href="http://www.soundcloud.com/amandaonthemoon" >
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
