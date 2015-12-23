import React from 'react';
import { Link, RouteHandler } from 'react-router';
import mui from 'material-ui';

import MenuIcon from 'react-material-icons/icons/navigation/menu';

require('../styles/_import.less');

import Breadcrumb from './components/breadcrumb.jsx';
import Sidebar from './components/sidebar.jsx';

export default React.createClass({
  displayName: 'App',
  render() {
    return (
      <div id="dashboard__wrapper" className="sidebar-open">
        <div className="dashboard">
          <Sidebar/>
          <div className="dashboard__content">
            <div className="dashboard__topbar container-fluid">
              <ul className="list-inline">
                <li>
                  <a href="#" className="sidebar-toggle"><i><MenuIcon/></i></a>
                </li>
                <li className="breadcrumnb">
                  <Breadcrumb routes={this.props.routes}/>
                </li>
              </ul>
            </div>
            <div className="dashboard__inner">
              {this.props.children}
            </div>
          </div>
        </div>


      </div>
    );
  }
});
