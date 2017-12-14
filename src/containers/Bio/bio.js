import React, { Component } from 'react';
import Helmet from 'react-helmet';
import mainImage0 from './../../../images/bio1.jpg';
import configCustom from '../../config_custom';

const style = require('./bio.scss');
export default class Bio extends Component {
  render() {
    const titleName = configCustom.app.bio.bioTitle1;
    const subHead = configCustom.app.bio.bioTitle2;
    const biography = configCustom.app.bio.bioDescription;

    return (
      <div>
        <Helmet title="Bio"/>
      <div className="container">
        <div>
          <hr/>
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
      </div>
    );
  }
}

