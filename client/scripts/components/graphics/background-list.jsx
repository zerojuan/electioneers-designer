import React, { PropTypes } from 'react';

import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default React.createClass({
  propTypes: {
    backgrounds: PropTypes.array.isRequired,
    baseUrl: PropTypes.string.isRequired
  },
  render() {
    return (
      <div>
        <List>
        {
          this.props.backgrounds.map( ( background ) => {
            return (
              <ListItem
                key={background.id}
                primaryText={background.file}
                leftAvatar={<Avatar src={ this.props.baseUrl + background.file }/>}>
              </ListItem>
            );
          })
        }
        </List>
      </div>
    );
  }
});
