import React, { PropTypes } from 'react';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import ImageList from './graphics/images-list';

export default React.createClass({
  render() {
    return (
      <div>
        <ImageList
          images={this.props.backgrounds}
          baseUrl={this.props.baseUrl}
          onChange={this.props.onChange}
          selectedBg={this.props.selectedBg}/>
      </div>
    );
  }
});
