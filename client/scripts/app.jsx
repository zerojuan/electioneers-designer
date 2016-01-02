import React from 'react';
import { Link, RouteHandler } from 'react-router';

// require('../styles/_import.less');
//
// import Breadcrumb from './components/breadcrumb.jsx';
// import Sidebar from './components/sidebar.jsx';
// import SidebarToggle from './components/sidebar-toggle.jsx';

import MenuItem from 'material-ui/lib/menus/menu-item';
import LeftNav from 'material-ui/lib/left-nav';
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

  handleClose() {
    console.log( 'Hendle close' );
    this.setState({ open: false });
  },

  render() {
//<Breadcrumb routes={this.props.routes}/>
console.log( 'State is: ', this.state.open );
    return (
      <div>
        <AppBar title="Designer"
          onLeftIconButtonTouchTap={this.handleToggle}>
        </AppBar>
        <LeftNav
          open={this.state.open}
          openRight={true}
          onRequestChange={open => this.setState({true})}
        >
          <MenuItem onTouchTap={this.handleClose} >Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose} >Menu Item 2</MenuItem>
        </LeftNav>
      </div>
    );
  }
});
