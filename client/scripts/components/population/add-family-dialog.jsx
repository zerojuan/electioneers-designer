import React, { PropTypes } from 'react';

import update from 'react-addons-update';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

export default React.createClass({
  render() {
    return (
      <Dialog
        title='Add Family'
        modal={false}
        actions={dialogActions}
        open={this.props.open}>
        <EditFamilyView
          family={this.state.initialFamily}
          districts={this.props.districts}
          population={this.props.population}
          onPropChange={this.handlePropChange}
          ></EditFamilyView>
      </Dialog>
    );
  }
});
