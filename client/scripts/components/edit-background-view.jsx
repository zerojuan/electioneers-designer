import React, { PropTypes } from 'react';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import BackgroundList from './graphics/background-list';

export default React.createClass({
  render() {
    return (
      <div>
        <BackgroundList
          backgrounds={this.props.backgrounds}
          baseUrl={this.props.baseUrl}
          onChange={this.props.onChange}
          selectedBg={this.props.selectedBg}/>
      </div>
    );
  }
});
