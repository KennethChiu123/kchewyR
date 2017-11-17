import React, { Component } from 'react';
import 'react-twitter-widgets';


class Social extends Component {

  constructor(props) {
    super(props);
    this.state = { width: '0', height: '0' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    let instaSlideshow;
    if (window.innerWidth > 426 ) {
      instaSlideshow = 'c54f9001e50055318fc3aa5286d0eee0';
      console.log('big');
    } else {
      console.log('small');
      instaSlideshow = '624976af3717534c9d605fa71c9952af';
    }
    console.log(instaSlideshow);

    return (
      <div className="content">
        <div className="container">
              <div>
                  <script src="//lightwidget.com/widgets/lightwidget.js">
                  </script>
                  <embed className="instaFeed2" src={'//lightwidget.com/widgets/' + instaSlideshow + '.html'} />
              </div>

              {/*
                  <!-- LightWidget WIDGET --><script src="//lightwidget.com/widgets/lightwidget.js"></script><iframe src="//lightwidget.com/widgets/c54f9001e50055318fc3aa5286d0eee0.html" scrolling="no" allowtransparency="true" class="lightwidget-widget" style="width: 100%; border: 0; overflow: hidden;"></iframe>
              */}

              <div className="twitterSphere">
                  <a className="twitter-timeline"
                  href="https://twitter.com/a_onthemoon?ref_src=twsrc%5Etfw">
                  </a>
                  <script async src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>

              </div>
          </div>
      </div>
    );
  }
}

export default Social;

