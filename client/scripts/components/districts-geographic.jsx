import React, { PropTypes } from 'react';

import { findDOMNode } from 'react-dom';

import CanvasGeoView from './canvas-geoview';

export default React.createClass({
  propTypes: {
    districts: PropTypes.array,
    baseUrl: PropTypes.string.isRequired
  },
  componentDidMount() {
    const el = findDOMNode( this );
    this.canvas = new CanvasGeoView( el, this.props.baseUrl );
    console.log( 'Mounting...' );
    // Create
    this.canvas.create( el, {
      width: '100%',
      height: '400px'
    }, {
      districts: this.props.districts
    });
  },
  componentDidUpdate() {
    const el = findDOMNode( this );

    this.canvas.update( el,  {
      districts: this.props.districts,
      baseUrl: this.props.baseUrl
    });
  },
  render() {
    return (
      <div></div>
    );
  }
});
