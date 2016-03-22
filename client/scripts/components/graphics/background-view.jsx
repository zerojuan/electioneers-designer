import React, { PropTypes } from 'react';

import BackgroundList from './background-list';

export default React.createClass({
  propTypes: {
    backgrounds: PropTypes.array.isRequired,
    baseUrl: PropTypes.string.isRequired
  },
  render() {
    return (
      <div>
        <BackgroundList backgrounds={this.props.backgrounds} baseUrl={this.props.baseUrl}/>
      </div>
    );
  }
});
