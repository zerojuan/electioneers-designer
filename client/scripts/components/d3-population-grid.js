import d3 from 'd3';

const populationGrid = {};

class PopulationGrid{
  constructor( handlers ) {
    console.log( 'Starting' );
    this.handlers = handlers;
  }

  create( el, props, state ) {
    let svg = d3.select( el ).append( 'svg' )
              .attr( 'class', 'grid' )
              .attr( 'width', props.width )
              .attr( 'height', props.height );

    svg.append( 'g' )
      .attr( 'class', 'cells' );

    this.update( el, state );
  }

  update( el, state ) {
    const scale = this._scales( el );
    this._drawGraph( el, scale, state );
  }

  destroy( el ) {
    console.log( 'I Am destroyed' );
  }

  _drawGraph( el, scales, state ) {
    // draw the actual objects
    const population = state.population;
    console.log( 'population: ', population );

    var g = d3.select( el ).selectAll( '.cells' );

    var point = g.selectAll( '.cell' )
      .data( population, d => d._id );

    // ENTER
    point.enter().append( 'circle' )
        .attr( 'class', 'cell' );

    // ENTER & UPDATE
    point.attr( 'cx', ( d, i ) => scales.x( i * 10 ) )
        .attr( 'cy', ( d, i ) => scales.y( i * 5 ) )
        .attr( 'r', d => scales.z( 3 ) );

    // EXIT
    point.exit()
        .remove();
  }

  _scales( el ) {
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    var x = d3.scale.linear()
      .range([ 0, width ])
      .domain([ 0, 100 ]);

    var y = d3.scale.linear()
      .range([ height, 0 ])
      .domain([ 0, 100 ]);

    var z = d3.scale.linear()
      .range([ 5, 20 ])
      .domain([ 1, 10 ]);

    return { x: x, y: y, z: z };
  }
}

export default PopulationGrid;
