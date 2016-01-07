import React from 'react';
import Time from 'react-time';

import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import FlatButton from 'material-ui/lib/flat-button';

var SelectableList = SelectableContainerEnhance( List );

export default React.createClass({
  getInitialState() {
    return {
      selectedIndex: 0
    };
  },

  handleUpdateSelectedFile( e, value ) {
    this.props.handleFileSelect( value );
  },

  handleFileDelete( name ) {
    const { handleFileDelete } = this.props;
    return ( e, value ) =>
      handleFileDelete( name );
  },

  render: function() {
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
          this.props.files.map(function( item, i ) {
            return (
              <ListItem
                value={ item.name }
                key={ i }
                primaryText={item.name}
                secondaryText={<Time value={item.lastModified} relative></Time>}
                rightIconButton={<FlatButton label='Delete'
                  primary={true} onTouchTap={ this.handleFileDelete( item.name ) }/>}
              >
              </ListItem>
            );
          }, this )
        }
      </SelectableList>
    );
  }
});
