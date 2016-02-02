import React from 'react';

import { findDOMNode } from 'react-dom';

import d3Grid from './d3-population-grid';

export default React.createClass({
  displayName: 'PopulationGrid',
  componentDidMount() {
    const el = findDOMNode( this );
    d3Grid.create( el, {
      width: '100%',
      height: '300px'
    }, this.props.population );
  },
  componentDidUpdate() {

  },
  componentWillUnmount() {
    const el = findDOMNode( this );
    d3Grid.destroy( el );
  },
  render() {
    return (
      <div className='PopulationGrid'>
      </div>
    );
  }
});
