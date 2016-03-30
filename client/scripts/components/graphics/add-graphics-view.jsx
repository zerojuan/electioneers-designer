import React, { PropTypes } from 'react';

import DropZone from 'react-dropzone';

export default React.createClass({
  onDrop( files ) {
    this.props.onFileSelect( files[ 0 ] );
  },
  render() {
    const preview = this.props.selectedFile ?
      <img src={this.props.selectedFile.preview} width='195px' height='195px'></img> :
      <div>Drop your file here</div>;
    return (
      <div>
        <DropZone
          onDrop={this.onDrop}
          multiple={false}>
          {
            preview
          }
        </DropZone>
      </div>
    );
  }
});
