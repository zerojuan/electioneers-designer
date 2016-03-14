import React from 'react';

import Snackbar from 'material-ui/lib/snackbar';

export default React.createClass({
  displayName: 'Snackbar',
  getInitialState() {
    return {
      open: false,
      currentMessageIndex: 0
    };
  },
  componentWillReceiveProps( nextProps ) {
    // TODO: Handle multiple snackbars
    if ( nextProps.messages.length > 0 ) {
      this.setState({
        activeMessage: nextProps.messages[ 0 ],
        currentMessageIndex: 0,
        open: true
      });
    } else {
      this.setState({
        open: false
      });
    }
  },
  handleRequestClose() {
    this.props.onHide();
    this.setState({
      open: false
    });
  },
  render() {
    let snackbar = null;
    if ( this.state.activeMessage ) {
      snackbar = <Snackbar
        open={this.state.open}
        message={this.state.activeMessage}
        autoHideDuration={3000}
        onRequestClose={this.handleRequestClose}
      />;
    }
    return (
      snackbar
    );
  }
});
