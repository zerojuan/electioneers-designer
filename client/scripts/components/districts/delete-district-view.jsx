import React, { PropTypes } from 'react';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import LabelTextField from '../label-textfield';

export default React.createClass({
  handlePropChange( propName ) {
    return ( event ) => {
      this.props.onPropChange( propName, event.target.value );
    };
  },
  render() {
    return (
      <div>
        <Tabs>
          <Tab label='info'>
            <LabelTextField
              label='Name'
              value={this.props.district.name}
              onChange={this.handlePropChange( 'name' )}
              />
          </Tab>
          <Tab label='neighbors'>
            This is the neighbors tab
          </Tab>
        </Tabs>
      </div>
    );
  }
});
