import d3 from 'd3';

const populationGrid = {};

populationGrid.create = function( el, props, state ) {
  let svg = d3.select( el ).append( 'svg' )
            .attr( 'class', 'grid' )
            .attr( 'width', props.width )
            .attr( 'height', props.height );

  svg.append( 'g' )
    .attr( 'class', 'cells' );

  this.update( el, state );
};

populationGrid.update = function( el, state ) {
  // draw the actual objects
  console.log( 'I am going to draw the objects here' );
};

populationGrid.destroy = function( el ) {

};

export default populationGrid;
