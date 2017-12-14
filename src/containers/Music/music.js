import React, { Component, PropTypes } from 'react';
import ___ from 'lodash';
import Helmet from 'react-helmet';
import configCustom from '../../config_custom';

const style = require('./music.scss');

class YouTube extends Component {
  static get propTypes() {
    return {
      video: PropTypes.string.isRequired,
      autoplay: PropTypes.string,
      rel: PropTypes.string,
      modest: PropTypes.string,
    };
  }
  render() {
    const videoSrc = 'https://www.youtube.com/embed/' +
        this.props.video + '?autoplay=' +
        this.props.autoplay + '&rel=' +
        this.props.rel + '&modestbranding=' +
        this.props.modest;
    return (
      <div className={style.videoWrapper}>
        <iframe className={style.player} type="text/html" width="100%" height="auto" title= {videoSrc}
      src={videoSrc}
      frameBorder="3"/>
          </div>
    );
  }
}

class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {videos: []};
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.videosList();
  }

  videosList() {
    const url = 'https://www.googleapis.com/youtube/v3/search\?part\=snippet\&channelId\=' + configCustom.app.music.youtube_channel_id + '\&maxResults\=10\&order\=date\&type\=video\&key\=AIzaSyDEwr0n0SB2Etm0GEjGsTrYOVvPafAfysQ';
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then( (json) => {
      this.setState({
        videos: json.items
      });
    }).catch(function(err) {
      console.log(err);
    });
  }


  render() {
    const videos = ___.map(this.state.videos, (video) => {
      return (
        <div className={style.video1} key={video.id.videoId}>
          <div>
            <div className={style.descriptionL}>
              <YouTube video={video.id.videoId} autoplay="0" rel="0" modest="1" />
            </div>
            <div className={style.descriptionR}>
              <div>
                <h3 className="descriptionTitle">{video.snippet.title} </h3>
              </div>
              <p>{video.snippet.description}</p>
            </div>
          </div>
          <div className={style.video2}>
          </div>
          <hr/>
        </div>
            );
    });
    return (
      <div>
        <Helmet title="Music"/>
        <div className="container">
          <hr/>{videos}
        </div>
      </div>
    );
  }
}

export default Music;

