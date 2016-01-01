import React from 'react';
import { Link, RouteHandler } from 'react-router';

require('../styles/_import.less');

import Breadcrumb from './components/breadcrumb.jsx';
import Sidebar from './components/sidebar.jsx';
import SidebarToggle from './components/sidebar-toggle.jsx';

export default React.createClass({
  displayName: 'App',
  getInitialState: function() {
    return {
      sidebarStatus: 'sidebar-closed',
      greeting: 'Connecting...'
    };
  },
  toggle() {
    if( this.state.sidebarStatus === 'sidebar-closed' ) {
      this.setState({ sidebarStatus: 'sidebar-open' });
    } else {
      this.setState({ sidebarStatus: 'sidebar-closed' });
    }
  },
  render() {
    let greeting = this.state.greeting;

    return (
      <div id="dashboard__wrapper" className={this.state.sidebarStatus}>
        <div className="dashboard">
          <Sidebar routes={this.props.routes}/>
          <div className="dashboard__content">
            <div className="dashboard__topbar container-fluid">
              <ul className="list-inline">
                <li>
                  <SidebarToggle toggle={this.toggle}/>
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
