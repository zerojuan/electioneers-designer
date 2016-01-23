import React, { PropTypes } from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import FamilyGeneratorView from './family-generator-view';

export default React.createClass({
  getInitialState() {
    return {
      count: 1,
      wealth: 5
    };
  },
  propTypes: {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  },
  handleCount( value ) {
    this.setState({
      count: value
    });
  },
  handleWealth( value ) {
    this.setState({
      wealth: value
    });
  },
  handleSubmit( ) {
    this.props.onSubmit({
      count: this.state.count,
      wealth: this.state.wealth
    });
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
        title='Generate Family'
        modal={false}
        actions={dialogActions}
        open={this.props.open}>
        <FamilyGeneratorView
          count={this.state.count}
          wealth={this.state.wealth}
          onCountChanged={this.handleCount}
          onWealthChanged={this.handleWealth}></FamilyGeneratorView>
      </Dialog>
    );
  }
});
