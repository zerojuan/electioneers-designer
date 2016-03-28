import React, { PropTypes } from 'react';

import ImagesList from './images-list';

export default React.createClass({
  propTypes: {
    backgrounds: PropTypes.array.isRequired,
    baseUrl: PropTypes.string.isRequired
  },
  handleSelectItem( index ) {
    console.log( 'Selected Item' );
  },
  render() {
    return (
      <div>
        <ImagesList
          images={this.props.backgrounds}
          baseUrl={this.props.baseUrl}
          onChange={this.handleSelectItem}/>
      </div>
    );
  }
});
