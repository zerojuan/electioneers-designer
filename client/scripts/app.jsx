import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, RouteHandler } from 'react-router';

require( '../styles/_import.less' );

import Breadcrumb from './components/breadcrumb.jsx';
import Sidebar from './components/sidebar.jsx';
import Snackbar from './components/snackbar.jsx';

import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';


const App = React.createClass({
  displayName: 'App',

  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired,
    files: PropTypes.arrayOf( PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastModified: PropTypes.string.isRequired
    }).isRequired ).isRequired,
    selectedFile: PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      sidebarOpen: false,
      messages: []
    };
  },

  handleToggle() {
    this.setState({ sidebarOpen: !this.state.open });
  },

  handleClose( event ) {
    this.setState({ sidebarOpen: false });
  },

  shiftMessage() {
    this.setState({
      messages: this.state.messages.shift()
    });
  },

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.message ) {
      console.log( 'How many messages? ' );
      this.setState({
        messages: [
          ...this.messages,
          nextProps.message
        ]
      });
    }
  },

  render() {
    const selectedFile = this.props.selectedFile === 'none' ?
                        'Designer' : this.props.selectedFile;
    let subtitle = this.props.routes[ 1 ] ? ' > ' + this.props.routes[ 1 ].name : '';

    if ( subtitle === ' > Home' ) {
      subtitle = '';
    }

    const title = selectedFile + subtitle;
    const save = <RaisedButton label='Save'></RaisedButton>;
    return (
      <div>
        <AppBar title={title}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={save}>

        </AppBar>
        <Sidebar
          routes={this.props.routes}
          open={this.state.sidebarOpen}
          selectedFile={selectedFile}
          handleClose={this.handleClose}/>
        <div
          style={{
            margin: '8px'
          }}
          >
          {this.props.children}
        </div>
        <Snackbar messages={this.state.messages} onHide={this.shiftMessage}/>
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
  const message = state.message;
  const isDirty = state.isDirty;

  return {
    selectedFile,
    files,
    didInvalidate,
    isFetching,
    message,
    isDirty
  };
}

export default connect( mapStateToProps )( App );
