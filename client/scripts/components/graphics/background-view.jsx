import React, { PropTypes } from 'react';

import ImagesList from './images-list';

export default React.createClass({
  propTypes: {
    backgrounds: PropTypes.array.isRequired,
    baseUrl: PropTypes.string.isRequired
  },
  render() {
    return (
      <div>
        <ImagesList images={this.props.backgrounds} baseUrl={this.props.baseUrl}/>
      </div>
    );
  }
});
