import React from 'react';
import { Link, RouteHandler } from 'react-router';

require('../styles/_import.less');

export default React.createClass({
  displayName: 'App',
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/home">Home</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});
