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
    console.log( 'population: ', population.length );

    var g = d3.select( el ).selectAll( '.cells' );

    var point = g.selectAll( '.cell' )
      .data( population, d => d._id );

    // ENTER
    point.enter().append( 'rect' )
        .attr( 'class', 'cell' );

    // ENTER & UPDATE
    point.attr( 'x', ( d, i ) => {
      console.log( 'X: ', scales.x( ( i % 10 ) ) );
          return scales.x( ( i % 10 ) );
        })
        .attr( 'y', ( d, i ) => {
          console.log( 'Y: ', scales.y( Math.floor( i / 10 ) ) );
          return scales.y( Math.floor( i / 10 ) );
        })
        .attr( 'width', 20 )
        .attr( 'height', 20 );

    // EXIT
    point.exit()
        .remove();
  }

  _scales( el ) {
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    var x = d3.scale.linear()
      .range([ 0, width ])
      .domain([ 0, 10 ]);

    var y = d3.scale.linear()
      .range([ 0, height ])
      .domain([ 0, 10 ]);

    var z = d3.scale.linear()
      .range([ 5, 20 ])
      .domain([ 1, 10 ]);

    return { x: x, y: y, z: z };
  }
}

export default PopulationGrid;
