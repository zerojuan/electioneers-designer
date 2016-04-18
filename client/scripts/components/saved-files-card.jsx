import React from 'react';
import Time from 'react-time';

import {Link} from 'react-router';

import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
import List from 'material-ui/lib/lists/list';
import Dialog from 'material-ui/lib/dialog';
import ListItem from 'material-ui/lib/lists/list-item';
import FlatButton from 'material-ui/lib/flat-button';

var SelectableList = SelectableContainerEnhance( List );

export default React.createClass({
  getInitialState() {
    return {
      selectedIndex: 0,
      dialogOpen: false
    };
  },

  handleUpdateSelectedFile( e, value ) {
    this.props.handleFileSelect( value );
  },

  handleFileDelete() {
    const { handleFileDelete } = this.props;
    this.setState({ dialogOpen: false });
    handleFileDelete( this.state.toBeDeletedFile );
  },

  handleShowDialog( name ) {
    return e =>
      this.setState({
        dialogOpen: true,
        toBeDeletedFile: name
      });
  },

  handleCloseDialog() {
    this.setState({ dialogOpen: false });
  },

  render: function() {
    const actions = [
      <FlatButton
        label='Cancel'
        secondary={true}
        onTouchTap={this.handleCloseDialog}
        />,
      <FlatButton
        label='Delete'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleFileDelete}
        />
    ];
    const dialog = (
      <Dialog
        title={'Delete ' + this.state.toBeDeletedFile + '?'}
        actions={actions}
        modal={false}
        open={this.state.dialogOpen}
        onRequestClose={this.handleCloseDialog}>
        This will permanently delete the file
      </Dialog>
    );

    return (
      <SelectableList
        valueLink={{
          value: this.props.selectedFile,
          requestChange: this.handleUpdateSelectedFile
        }}

        style={{
          paddingTop: '-8px',
          paddingBottom: '-8px'
        }}>
        {
          dialog
        }
        {
          this.props.files.map(function( item, i ) {
            return (
              <ListItem
                value={ item.name }
                key={ i }
                primaryText={<Link to={item.name + '/'}>{item.name}</Link>}
                secondaryText={<Time value={item.lastModified} relative></Time>}
                rightIconButton={
                  <FlatButton label='Delete'
                  primary={true} onTouchTap={ this.handleShowDialog( item.name ) }
                />}
              >
              </ListItem>
            );
          }, this )
        }
      </SelectableList>
    );
  }
});
