import React, { PropTypes } from 'react';

import TextField from 'material-ui/lib/text-field';

import DropZone from 'react-dropzone';

const Details = ( props ) => (
  <TextField value={props.name} onChange={props.onEdit}></TextField>
);

export default React.createClass({
  onDrop( files ) {
    this.props.onFileSelect( files[ 0 ] );
  },
  onEditProp( event ) {
    this.props.onFilenameEdit( event.target.value );
  },
  render() {
    const hasFile = this.props.selectedFile;
    const preview = hasFile ?
      <img src={this.props.selectedFile.preview} width='195px' height='195px'></img> :
      <div>Drop your file here</div>;
    const details = hasFile ?
      <Details
        onEdit={this.onEditProp}
        name={this.props.filename}
        /> :
      <div>Data here</div>;
    return (
      <div>
        <DropZone
          onDrop={this.onDrop}
          multiple={false}>
          {
            preview
          }
        </DropZone>
        {
          details
        }
      </div>
    );
  }
});
