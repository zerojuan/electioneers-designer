import React from 'react';
import { Link, RouteHandler } from 'react-router';

// import '../styles/main.less';

export default React.createClass({
  displayName: 'App',
  render() {
    return (
      <div>
        This is the react
        <ul>
          <li><Link to="/home">Home</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});
