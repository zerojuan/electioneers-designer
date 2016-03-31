import React, { PropTypes } from 'react';

import update from 'react-addons-update';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import AddGraphicsView from './add-graphics-view';

export default React.createClass({
  propTypes: {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    images: PropTypes.array
  },
  getInitialState() {
    return {
      selectedFile: null
    };
  },
  handleSubmit() {
    this.props.onSubmit({
      file: this.state.selectedFile,
      filename: this.state.filename
    });
    this.setState({
      selectedFile: null
    });
  },
  handleClose() {
    this.setState({
      selectedFile: null
    });
    this.props.onClose();
  },
  handleFileSelect( file ) {
    this.setState({
      selectedFile: file,
      filename: file.name
    });
  },
  handleFilenameEdit( name ) {
    this.setState({
      filename: name
    });
  },
  render() {
    const dialogActions = [
      <FlatButton
        label='Cancel'
        secondary={true}
        onTouchTap={this.handleClose} />,
      <FlatButton
        label='Submit'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit} />
    ];

    return (
      <Dialog
        title='Upload Graphics'
        modal={false}
        actions={dialogActions}
        open={this.props.open}>
        <AddGraphicsView
          selectedFile={this.state.selectedFile}
          filename={this.state.filename}
          onFileSelect={this.handleFileSelect}
          onFilenameEdit={this.handleFilenameEdit}/>
      </Dialog>
    );
  }
});
