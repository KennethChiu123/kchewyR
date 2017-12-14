import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Bio,
    Contact,
    Home,
    Music,
    NotFound,
    Social
  } from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes */ }
      <Route path="bio" component={Bio}/>
      <Route path="music" component={Music}/>
      <Route path="social" component={Social}/>
      <Route path="contact" component={Contact}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
