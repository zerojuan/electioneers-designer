import React, { PropTypes } from 'react';

import update from 'react-addons-update';

import { saveFile } from './actions';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import DeleteFamilyView from './delete-family-view';

export default React.createClass({
  propTypes: {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    family: PropTypes.object,
    population: PropTypes.array,
    districts: PropTypes.array
  },
  getInitialState( ) {
    return {
      initialFamily: this.props.family
    };
  },
  componentWillReceiveProps( nextProps ) {
    if ( nextProps.family ) {
      this.setState({
        initialFamily: nextProps.family
      });
    }
  },
  handlePropChange( propName, value ) {
    console.log( 'Propname: ', propName, value );
    let temp = {};
    temp[ propName ] = value;
    let family = this.state.initialFamily;
    if ( !family ) {
      family = this.props.family;
    }

    var newFamily = update( family, {
      $merge: temp
    });

    this.setState({
      initialFamily: newFamily
    });
  },
  handleSubmit() {
    // return the value of the saved family
    this.props.onSubmit( this.state.initialFamily );
    // save to file
    saveFile( this.props.selectedFile );

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
        title='Delete Family'
        modal={false}
        actions={dialogActions}
        open={this.props.open}>
        <DeleteFamilyView
          family={this.state.initialFamily}
          districts={this.props.districts}
          population={this.props.population}
          onPropChange={this.handlePropChange}
          ></DeleteFamilyView>
      </Dialog>
    );
  }
});
