import React from 'react';

import { connect } from 'react-redux';

import { selectFile, loadFileIfNeeded } from '../actions';

const GraphicsPage = React.createClass({
  displayName: 'GraphicsPage',
  render() {
    return (
      <div>
        <h1> This is the graphics page </h1>
        <div>
          <p>Backgrounds</p>
          <p>Districts</p>
          <p>Portraits</p>
          <p>Logos</p>
        </div>
      </div>
    );
  }
});

function mapStateToProps( state ) {
  const selectedFile = state.selectedFile;

  return {
    selectedFile
  };
}

export default connect( mapStateToProps )( GraphicsPage );
