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

  handleUpdateSelectedIndex( e, index ) {
    this.setState( {
      selectedIndex: index
    });
  },
  render: function(){
    return (
      <SelectableList
        valueLink={{
          value: this.state.selectedIndex,
          requestChange: this.handleUpdateSelectedIndex
        }}>
        {
          this.props.files.map( function( item, i ) {
            return (
              <ListItem
                value={ i + 1 }
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
