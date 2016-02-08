import d3 from 'd3';

const populationGrid = {};

class PopulationGrid{
  constructor( handlers ) {
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
    const selectedFamilyA = state.selectedA;
    const selectedFamilyB = state.selectedB;

    var g = d3.select( el ).selectAll( '.cells' );

    var point = g.selectAll( '.cell' )
      .data( population, d => d._id );

    // ENTER
    point.enter().append( 'rect' )
        .attr( 'class', 'cell' );

    // ENTER & UPDATE
    point.attr( 'x', ( d, i ) => {
          return scales.x( ( i % 10 ) );
        })
        .attr( 'y', ( d, i ) => {
          return scales.y( Math.floor( i / 10 ) );
        })
        .attr( 'width', 20 )
        .attr( 'height', 20 )
        .attr( 'fill', ( d ) => {
          if( selectedFamilyA && d._id === selectedFamilyA._id ) {
            return '#0c0';
          } else if ( selectedFamilyB && d._id === selectedFamilyB._id ) {
            return '#c00';
          }
          return '#ccc';
        })
        .on( 'click', ( d ) => {
          this.handlers.onClick( d );
        });

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
