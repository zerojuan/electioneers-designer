import React, { PropTypes } from 'react';

import { findDOMNode } from 'react-dom';

import CanvasGeoView from './canvas-geoview';

export default React.createClass({
  propTypes: {
    districts: PropTypes.array
  },
  componentDidMount() {
    const el = findDOMNode( this );
    this.canvas = new CanvasGeoView( el );

    // Create
    this.canvas.create( el, {
      width: '100%',
      height: '400px'
    }, {
      population: this.props.district,
      dimension: 'intelligence'
    });
  },
  render() {
    return (
      <div></div>
    );
  }
});
