import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, RouteHandler } from 'react-router';

require('../styles/_import.less');

import Breadcrumb from './components/breadcrumb.jsx';
import Sidebar from './components/sidebar.jsx';

import AppBar from 'material-ui/lib/app-bar';

const App = React.createClass({
  displayName: 'App',

  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired,
    files: PropTypes.arrayOf( PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastModified: PropTypes.string.isRequired
    }).isRequired).isRequired,
    selectedFile: PropTypes.string.isRequired
  },

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
        <Sidebar routes={this.props.routes} open={this.state.open} selectedFile={this.props.selectedFile} handleClose={this.handleClose}/>
        <div
          style={{
            margin: '8px'
          }}
          >
          {this.props.children}
        </div>

      </div>
    );
  }

});

function mapStateToProps( state ) {
  const {
    isFetching,
    didInvalidate,
    items: files
  } = state.savedFiles || {
    isFetching: false,
    didInvalidate: false,
    items: []
  };

  const selectedFile = state.selectedFile;

  return {
    selectedFile,
    files,
    didInvalidate,
    isFetching
  }
}

export default connect( mapStateToProps )( App );
