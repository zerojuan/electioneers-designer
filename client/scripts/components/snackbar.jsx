import React from 'react';

import Snackbar from 'material-ui/lib/snackbar';

export default React.createClass({
  displayName: 'MySnackbar',
  getInitialState() {
    return {
      open: false,
      currentMessageIndex: 0
    };
  },
  componentWillReceiveProps( nextProps ) {
    // TODO: Handle multiple snackbars
    console.log( 'Recieving props...', nextProps );
    if ( nextProps.messages.length > 0 ) {
      console.log( 'Am I here' );
      this.setState({
        activeMessage: nextProps.messages[ 0 ],
        currentMessageIndex: 0,
        open: true
      });
    } else {
      console.log( 'Or here' );
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
