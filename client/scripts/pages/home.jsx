import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchFilesIfNeeded, selectFile, addFile, deleteFile, loadFileIfNeeded } from '../actions';

import SavedFilesCard from '../components/saved-files-card.jsx';

import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

const Home = React.createClass({
  displayName: 'HomePage',
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired,
    files: PropTypes.arrayOf( PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastModified: PropTypes.string.isRequired
    }).isRequired ).isRequired
  },
  componentDidMount: function() {
    const { dispatch } = this.props;
    dispatch( fetchFilesIfNeeded() );
  },
  handleFileSelect( value ) {
    const { dispatch } = this.props;
    dispatch( loadFileIfNeeded( value ) );
    dispatch( selectFile( value ) );
  },
  handleFileAdd( value ) {
    const { dispatch } = this.props;
    dispatch( addFile() );
  },
  handleFileDelete( name ) {
    const { dispatch } = this.props;
    dispatch( deleteFile( name ) );
  },
  render() {

    return (
      <div>
        <div style={{
            marginTop: '20px',
            marginBottom: '20px'
          }}>
          <RaisedButton label='New' primary={true} onTouchTap={ this.handleFileAdd }/>
        </div>
        <SavedFilesCard
          files={ this.props.files }
          selectedFile={ this.props.selectedFile }
          handleFileSelect={ this.handleFileSelect }
          handleFileDelete={ this.handleFileDelete } />
      </div>
    );
  }
});

function mapStateToProps( state ) {
  const {
    isFetching,
    didInvalidate,
    items: files,
    isDirty
  } = state.savedFiles || {
    isFetching: false,
    didInvalidate: false,
    items: [],
    isDirty: false
  };

  const selectedFile = state.selectedFile;

  return {
    files,
    didInvalidate,
    isFetching,
    selectedFile,
    isDirty
  };
}

export default connect( mapStateToProps )( Home );
