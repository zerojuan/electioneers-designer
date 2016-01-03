import React from 'react';
import { Link, RouteHandler } from 'react-router';

require('../styles/_import.less');

import Breadcrumb from './components/breadcrumb.jsx';
import Sidebar from './components/sidebar.jsx';

import AppBar from 'material-ui/lib/app-bar';

export default React.createClass({
  displayName: 'App',
  getInitialState: function() {
    return {
      open: false
    };
  },

  handleToggle() {
    console.log( 'Handle toggle. This has been toggled' );
    this.setState( {open: !this.state.open });
  },

  handleClose( event ) {
    console.log( 'Hendle close', event );
    this.setState({ open: false });
  },

  render() {

    return (
      <div>
        <AppBar title="Designer"
          onLeftIconButtonTouchTap={this.handleToggle}>
        </AppBar>
        <Sidebar routes={this.props.routes} open={this.state.open} handleClose={this.handleClose}/>
        {this.props.children}
      </div>
    );
  }
});
