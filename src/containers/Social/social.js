import React, { Component } from 'react';
import ___ from 'lodash';
import 'react-twitter-widgets';


const style = require('./social.scss');
class Social extends Component {

  constructor(props) {
    super(props);
    this.state = { width: '0', height: '0' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    const scriptNode = document.getElementById('twitter-wjs');
    if (scriptNode) {
      scriptNode.parentNode.removeChild(scriptNode);
    }
    const foo = function(ddd, sss, idd) {
      let js1 = '';
      const fjs = ddd.getElementsByTagName(sss)[0];
      const ppp = /^http:/.test(ddd.location) ? 'http' : 'https';
      if (!ddd.getElementById(idd)) {
        js1 = ddd.createElement(sss);
        js1.id = idd;
        js1.src = ppp + '://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js1, fjs);
      }
    };
    foo(document, 'script', 'twitter-wjs');
    this.instaList();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  instaList() {
    const instagramName = 'amandaonthemoon';
    const url = 'https://www.instagram.com/' + instagramName + '/?__a=1';
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then( (json) => {
      console.log(json);
      this.setState({
        biography: json.user.biography,
        followed_by: json.user.followed_by,
        follows: json.user.follows,
        full_name: json.user.full_name,
        username: json.user.username,
        media: json.user.media.nodes
      });
    }).catch(function(err) {
      console.log(err);
    });
  }

  render() {
    const medias = ___.map(this.state.media, (media) => {
      const captionLines = [];
      if (typeof media.caption !== 'undefined') {
        if ((media.caption).indexOf('#') > -1) {
          console.log('found hashtag');
          const caption = media.caption.split('#');
          let phrase = '';
          for (phrase in caption) {
            if (phrase > 0 || (phrase === 0 && media.caption[0] === '#')) {
              const hashtag = caption[phrase].trim().split(' ')[0].trim();
              console.log(hashtag);
              const tagLink = 'https://www.instagram.com/explore/tags/' + hashtag + '/?hl=en';
              captionLines.push(<span> </span>);
              captionLines.push(<a href={tagLink} className={style.anchorT}> #{hashtag} </a>);
              captionLines.push(<span> </span>);
              if (caption[phrase].trim().split(' ').length > 1) {
                const restOfString = caption[phrase].trim().split(' ').slice(1).join(' ');
                console.log(restOfString);
                const userList = restOfString.split('@');
                let user1 = '';
                console.log(userList);
                for (user1 in userList) {
                  if (user1 > 0) {
                    const usertag = userList[user1].trim().split(' ')[0].trim();
                    const userLink = 'https://www.instagram.com/' + usertag + '/?hl=en';
                    captionLines.push(<span> </span>);
                    captionLines.push(<a href={userLink} className={style.anchorT}>@{usertag}</a>);
                    captionLines.push(<span> </span>);
                  }
                  if (userList[user1].trim().split(' ').length > 1) {
                    const restOfString2 = userList[user1].trim().split(' ').slice(1).join(' ');
                    captionLines.push(<span>{restOfString2.trim()}</span>);
                  }
                }
              }
            } else {
              console.log('Since it is false do this');
              const userList = caption[phrase].split('@');
              captionLines.push(<span>{userList[0]}</span>);
              let user1 = '';
              console.log(userList);
              for (user1 in userList) {
                if (user1 > 0) {
                  const usertag = userList[user1].trim().split(' ')[0].trim();
                  const userLink = 'https://www.instagram.com/' + usertag + '/?hl=en';
                  captionLines.push(<span> </span>);
                  captionLines.push(<a href={userLink} className={style.anchorT}>@{usertag}</a>);
                  captionLines.push(<span> </span>);
                  if (userList[user1].trim().split(' ').length > 1) {
                    console.log(userList[user1]);
                    const restOfString2 = userList[user1].trim().split(' ').slice(1).join(' ');
                    console.log(restOfString2);
                    captionLines.push(<span>{restOfString2}</span>);
                  }
                }
              }
            }
          }
        } else {
          captionLines.push(<span>{media.caption}</span>);
        }
      }
      return (
        <div className={style.video1} key={media.id}>
          <div>
            <div className={style.descriptionL}>
              <img src={media.display_src} alt="nothing yet" />
            </div>
            <div className={style.descriptionR}>
              <div>
                <h3 className="descriptionTitle"> </h3>
              </div>
              <div>
                {captionLines}
              </div>
            </div>
          </div>
          <div className={style.video2}>
          </div>
          <hr/>
        </div>
            );
    });

    return (
      <div className="content">
        <div className="container">
              <div>
              {medias}
              </div>
              {/*
              <div>
                  <script src="//lightwidget.com/widgets/lightwidget.js">
                  </script>
                  <embed className="instaFeed2" src={'//lightwidget.com/widgets/' + instaSlideshow + '.html'} />
              </div>

                  <!-- LightWidget WIDGET --><script src="//lightwidget.com/widgets/lightwidget.js"></script><iframe src="//lightwidget.com/widgets/c54f9001e50055318fc3aa5286d0eee0.html" scrolling="no" allowtransparency="true" class="lightwidget-widget" style="width: 100%; border: 0; overflow: hidden;"></iframe>

              <div className="twitterSphere">
                  <a className="twitter-timeline"
                  href="https://twitter.com/a_onthemoon?ref_src=twsrc%5Etfw">
                  </a>
                  <script async src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>

              </div>
              */}
          </div>
      </div>
    );
  }
}

export default Social;

