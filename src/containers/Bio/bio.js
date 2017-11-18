import React, { Component } from 'react';
import mainImage0 from './../../../images/bio1.jpg';

const style = require('./bio.scss');
export default class Bio extends Component {
  render() {
    const titleName = 'Amanda Carson';
    const subHead = 'Singer/songwriter, born and raised in Los Angeles';
    const biography = 'Combining vivid and intimately human lyrics with a sultry folk sound, Amanda draws much of her inspiration from artists like The Civil Wars, Laura Marling, Brandi Carlile, and Gregory Alan Isakov. After playing with numerous bands and comprising one half of the folk duo, Buttonwillow Locomotive, Amanda Carson\'s latest endeavor has been a solo project, and she can often be found playing at Venues around Hollywood and West Hollywood.';
    return (
      <div className="container">
        <div>
          <div className={style.bioL}>
            <img src={mainImage0} alt="Bio Pic" />
          </div>
          <div className={style.bioR}>
            <div>
              <h2>{titleName}</h2>
              <h4>{subHead}</h4>
            </div>
            <div>
              <p/>
              <p/>
              <p/>
              <p> {biography} </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

