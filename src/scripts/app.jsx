import React from 'react';
import { Link, RouteHandler } from 'react-router';
import mui from 'material-ui';

import MenuIcon from 'react-material-icons/icons/navigation/menu';

require('../styles/_import.less');

export default React.createClass({
  displayName: 'App',
  render() {
    return (
      <div id="dashboard__wrapper">
        <div className="dashboard">
          <div className="dashboard__content">
            <div className="dashboard__topbar container-fluid">
              <ul className="list-inline">
                <li>
                  <a href="#" className="sidebar-toggle"><i><MenuIcon/></i></a>
                </li>
                <li className="breadcrumnb">
                </li>
              </ul>
            </div>

          </div>
        </div>

        {this.props.children}
      </div>
    );
  }
});
