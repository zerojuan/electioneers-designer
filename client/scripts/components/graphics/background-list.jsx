import React, { PropTypes } from 'react';

import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';

import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

let SelectableList = SelectableContainerEnhance( List );

export default React.createClass({
  getInitialState() {
    return {
      selected: this.props.selectedBg
    };
  },
  propTypes: {
    backgrounds: PropTypes.array.isRequired,
    baseUrl: PropTypes.string.isRequired
  },
  handleSelect( e, index ) {
    this.setState({
      selected: index
    });
    this.props.onChange( index );
  },
  render() {

    return (
      <div>
        <SelectableList
          value={this.state.selected}
          valueLink={{
            value: this.state.selected,
            requestChange: this.handleSelect
          }}>
        {
          this.props.backgrounds.map( ( background ) => {
            return (
              <ListItem
                key={background.id}
                value={background.id}
                primaryText={background.file}
                leftAvatar={<Avatar src={ this.props.baseUrl + background.file }/>}>
              </ListItem>
            );
          })
        }
      </SelectableList>
      </div>
    );
  }
});
