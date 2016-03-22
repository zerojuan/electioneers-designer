import React, { PropTypes } from 'react';

import update from 'react-addons-update';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import EditBackgroundView from './edit-background-view';

export default React.createClass({
  propTypes: {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    backgrounds: PropTypes.array.isRequired,
    baseUrl: PropTypes.array.baseUrl
  },
  handleSubmit() {
    this.props.onClose();
  },
  render() {
    const dialogActions = [
      <FlatButton
        label='Cancel'
        secondary={true}
        onTouchTap={this.props.onClose} />,
      <FlatButton
        label='Submit'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit} />
    ];

    return (
      <Dialog
        title='Edit District'
        modal={false}
        actions={dialogActions}
        open={this.props.open}>
        <EditBackgroundView
          backgrounds={this.props.backgrounds}
          baseUrl={this.props.baseUrl}/>
      </Dialog>
    );
  }
});
