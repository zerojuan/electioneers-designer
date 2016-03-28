import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    image: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired
  },
  handleSelectItem( index ) {
    console.log( 'Selecting the item' );
  },
  render() {
    const { image, baseUrl } = this.props;
    return (
      <div>
        <img
          src={baseUrl + image.file}
          />
        <span> {image.name} </span>
      </div>
    );
  }
});
