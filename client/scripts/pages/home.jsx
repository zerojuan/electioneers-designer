import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchFilesIfNeeded, selectFile } from '../actions';

import SavedFilesCard from '../components/saved-files-card.jsx';

let Home = React.createClass({
  displayName: 'HomePage',
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired,
    files: PropTypes.arrayOf( PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastModified: PropTypes.string.isRequired
    }).isRequired).isRequired,
    selectedFile: PropTypes.string.isRequired
  },
  getDefaultProps() {
    return {
      title: 'Home Page'
    };
  },
  componentDidMount: function(){
    const { dispatch } = this.props;
    dispatch( fetchFilesIfNeeded() );
  },
  handleFileSelect( value ) {
    const { dispatch } = this.props;
    dispatch( selectFile( value ) );
  },
  render() {

    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>Count: {this.props.files.length}</div>
        <SavedFilesCard files={this.props.files} selectedFile={this.props.selectedFile} handleFileSelect={ this.handleFileSelect } />
      </div>
    )
  }
})

function mapStateToProps( state ) {
  console.log( 'State: ', state );
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
    files,
    didInvalidate,
    isFetching,
    selectedFile
  }
}

export default connect( mapStateToProps )( Home );
