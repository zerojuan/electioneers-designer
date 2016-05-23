import React, { PropTypes } from 'react';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import LabelTextField from '../label-textfield';

export default React.createClass({
  render() {
    return (
      <div>
        <h4>Delete { this.props.district.name } ?</h4>
      </div>
    );
  }
});
