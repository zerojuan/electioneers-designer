import React, { PropTypes } from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import EditDistrictView from './edit-district-view';

export default React.createClass({
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
        <EditDistrictView/>
      </Dialog>
    );
  }
});
