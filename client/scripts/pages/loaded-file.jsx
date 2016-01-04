import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectFile } from '../actions';

let LoadedFilePage = React.createClass({
  componentDidMount() {
    const { dispatch } = this.props;
    const selectedFile = this.props.params.filename;
    dispatch( selectFile( selectedFile ) );
  },
  render() {
    return (
      <div>
        { this.props.selectedFile }
      </div>
    )
  }
});

function mapStateToProps( state ) {
  const selectedFile = state.selectedFile;

  return {
    selectedFile
  }
}

export default connect( mapStateToProps )( LoadedFilePage );
