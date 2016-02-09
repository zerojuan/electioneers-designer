import React, { PropTypes } from 'react';

import update from 'react-addons-update';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import PairFamilyView from './pair-family-view';

export default React.createClass({
  propTypes: {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    familyA: PropTypes.object,
    familyB: PropTypes.object
  },
  getInitialState( ) {
    return {
      initialFamilyA: this.props.familyA,
      initialFamilyB: this.props.familyB
    };
  },
  componentWillReceiveProps( nextProps ) {
    if( nextProps.familyA ) {
      this.setState({
        initialFamilyA: nextProps.familyA,
        initialFamilyB: nextProps.familyB
      });
    }
  },
  handleSubmit() {
    // return the value of the saved family
    this.props.onSubmit( this.state.initialFamilyA, this.state.initialFamilyB );
    this.props.onClose();
  },
  handleAddPair() {

  },
  handleDeletePair() {

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
        title='Family Connection'
        modal={false}
        actions={dialogActions}
        open={this.props.open}>
        <PairFamilyView
          familyA={this.state.initialFamilyA}
          familyB={this.state.initialFamilyB}
          onAddPair={this.handleAddPair}
          onDeletePair={this.handleDeletePair}
          />
      </Dialog>
    );
  }
});
