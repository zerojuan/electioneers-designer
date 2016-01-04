import React from 'react';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

var SelectableList = SelectableContainerEnhance( List );

export default React.createClass({
  getInitialState() {
    return {
      selectedIndex: 0
    }
  },

  handleUpdateSelectedFile( e, value ) {
    this.props.handleFileSelect( value );
  },
  render: function(){
    return (
      <SelectableList
        valueLink={{
          value: this.props.selectedFile,
          requestChange: this.handleUpdateSelectedFile
        }}>
        {
          this.props.files.map( function( item, i ) {
            return (
              <ListItem
                value={ item.name }
                key={ i }
                primaryText={ item.name }
              >
              Hello
              </ListItem>
            )
          })
        }
      </SelectableList>
    );
  }
});
