import React, { PropTypes } from 'react';

import update from 'react-addons-update';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import DeleteDistrictView from './delete-district-view';

export default React.createClass({
  propTypes: {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  },
  getInitialState() {
    return {
      initialDistrict: {
        name: ''
      }
    };
  },
  handlePropChange( propName, value ) {
    let temp = {};
    temp[ propName ] = value;
    let district = this.state.initialDistrict;

    var newDistrict = update( district, {
      $merge: temp
    });

    this.setState({
      initialDistrict: newDistrict
    });
  },
  handleSubmit() {
    // return the value of the saved family
    this.props.onSubmit( this.state.initialDistrict );
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
        title='Delete District'
        modal={false}
        actions={dialogActions}
        open={this.props.open}>
        <DeleteDistrictView
          district={this.state.initialDistrict}
          onPropChange={this.handlePropChange}/>
      </Dialog>
    );
  }
});
