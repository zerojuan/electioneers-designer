import React, { PropTypes } from 'react';

import update from 'react-addons-update';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

export default React.createClass({
  propTypes: {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  },
  handleSubmit() {
  },
  onClose() {
  },
  open(){
  },
  render() {
    const dialogActions = [
      <FlatButton
        label='Cancel'
        secondary={true}
        onTouchTap={this.onClose} />,
      <FlatButton
        label='Submit'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit} />
    ];

    return (
      <Dialog
        title='Add Family'
        modal={false}
        actions={dialogActions}
        open={this.open}>
      </Dialog>
    );
  }
});
