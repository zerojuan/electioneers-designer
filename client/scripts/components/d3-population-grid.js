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
    point.enter().append( 'circle' )
        .attr( 'class', 'cell' );

    // ENTER & UPDATE
    point.attr( 'cx', ( d, i ) => {
          return scales.x( ( i % 10 ) ) + 10;
        })
        .attr( 'cy', ( d, i ) => {
          return scales.y( Math.floor( i / 10 ) ) + 10;
        })
        .attr( 'r', 10 )
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

    // draw connections
    // extract connections from families
    let connections = [];
    _.forEach( population, ( family, i ) => {
      _.forEach( family.connections, ( connect ) => {
        const pairIndex = population.findIndex( ( el ) => el._id === connect._id );
        connections.push( {
          from: i,
          to: pairIndex,
          connection: connect
        });
      });
    });

    console.log( 'How many connections: ', connections );
    const lines = g.selectAll( '.line ')
      .data( connections );

    lines.enter().append( 'line' )
      .attr( 'class', 'line' );

    lines.attr( 'x1', ( d ) => {
        return scales.x( d.from % 10 ) + 10;
      })
      .attr( 'y1', ( d ) => {
        return scales.y( Math.floor( d.from / 10 ) ) + 10;
      })
      .attr( 'x2', ( d ) => {
        return scales.x( d.to % 10 ) + 10;
      })
      .attr( 'y2', ( d ) => {
        console.log( 'What is D? ' );
        return scales.y( Math.floor( d.to / 10 ) ) + 10;
      })
      .attr( 'stroke-width', 2 )
      .attr( 'stroke', '#ff0000');


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
