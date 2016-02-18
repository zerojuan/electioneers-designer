import React from 'react';

import { findDOMNode } from 'react-dom';

import DropdownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

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
  getInitialState(){
    return {
      dimensionValue: 'wealth'
    };
  },
  componentDidMount() {
    const el = findDOMNode( this );
    this.d3Grid = new D3Grid( this.handlers() );
    this.d3Grid.create( el, {
      width: '100%',
      height: '400px'
    }, {
      population: this.props.population,
      dimension: 'intelligence'
    });
  },
  componentDidUpdate() {
    const el = findDOMNode( this );

    this.d3Grid.update( el,  {
      population: this.props.population,
      dimension: this.state.dimensionValue,
      selectedA: this.props.selectedFamilyA,
      selectedB: this.props.selectedFamilyB
    });
  },
  componentWillUnmount() {
    const el = findDOMNode( this );
    this.d3Grid.destroy( el );
  },
  handleDimensionChange( e, index, value ){
    this.setState({
      dimensionValue: value
    });
  },
  render() {
    return (
      <div>
        <DropdownMenu value={this.state.dimensionValue} onChange={this.handleDimensionChange}>
          <MenuItem value='wealth' primaryText='Wealth'/>
          <MenuItem value='intelligence' primaryText='Intelligence'/>
          <MenuItem value='leadership' primaryText='Leadership'/>
          <MenuItem value='charm' primaryText='Charm'/>
        </DropdownMenu>
        <div className='PopulationGrid'>
        </div>
      </div>

    );
  }
});
