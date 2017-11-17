import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

import mainImage0 from './../../../images/Slide1.jpg';
import mainImage1 from './../../../images/Slide2.jpg';
import mainImage2 from './../../../images/Slide3.jpg';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');
    return (
      <div className={styles.carouselContainer}>
        <div className={styles.carouselContent}>
          <Carousel
            autoPlay={!false}
            infiniteLoop={!false}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            >
            <a href="#">
              <div>
                <img src={mainImage0} alt="Slide1"/>
              </div>
            </a>
            <a href="#">
              <div>
                <img src={mainImage1} alt="Slide2"/>
              </div>
            </a>
            <a href="#">
              <div>
                <img src={mainImage2} alt="Slide3"/>
              </div>
            </a>
          </Carousel>
        </div>
      </div>
    );
  }
}
