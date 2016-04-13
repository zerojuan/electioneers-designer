import React, { PropTypes } from 'react';

import TextField from 'material-ui/lib/text-field';

export default React.createClass({
  propTypes: {
    image: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  },
  handleSelectItem( index ) {
    console.log( 'Selecting the item' );
  },
  handleChange( event ) {
    this.props.onChange( event.target.value );
  },
  render() {
    const { image, baseUrl } = this.props;
    return (
      <div>
        <img
          src={baseUrl + image.file}
          style={{
            maxWidth: 250,
            maxHeight: 250
          }}
          />
        <span>
          <TextField
            value={image.name}
            onChange={this.handleChange}
            />
        </span>
      </div>
    );
  }
});
