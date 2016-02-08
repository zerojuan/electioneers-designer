import React from 'react';

import { findDOMNode } from 'react-dom';

import D3Grid from './d3-population-grid';

export default React.createClass({
  displayName: 'PopulationGrid',
  handlers() {
    return {
      onClick: ( d ) => {
        // update data
        this.props.onCellSelected( d );
      }
    };
  },
  componentDidMount() {
    const el = findDOMNode( this );
    this.d3Grid = new D3Grid( this.handlers() );
    this.d3Grid.create( el, {
      width: '100%',
      height: '400px'
    }, {
      population: this.props.population
    });
  },
  componentDidUpdate() {
    const el = findDOMNode( this );
    this.d3Grid.update( el,  {
      population: this.props.population,
      selectedA: this.props.selectedFamilyA,
      selectedB: this.props.selectedFamilyB
    });
  },
  componentWillUnmount() {
    const el = findDOMNode( this );
    this.d3Grid.destroy( el );
  },
  render() {
    return (
      <div className='PopulationGrid'>
      </div>
    );
  }
});
