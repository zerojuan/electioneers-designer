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

    this._drawLines( population, g, scales );
    this._drawCell( population, g, scales, selectedFamilyA, selectedFamilyB );


  }

  _drawCell( population, g, scales, selectedFamilyA, selectedFamilyB ) {
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
        .attr( 'r', ( d ) => {
          return scales.z(d.intelligence);
        } )
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

  _drawLines( population, g, scales ) {
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

    const lines = g.selectAll( '.line ')
      .data( connections );

    lines.enter().append( 'path' )
      .attr( 'class', 'line' );

    lines.attr( 'd', ( d ) => {
      const x1 = scales.x( d.from % 10 ) + 10;
      const y1 = scales.y( Math.floor( d.from / 10 ) ) + 10;
      const x2 = scales.x( d.to % 10 ) + 10;
      const y2 = scales.y( Math.floor( d.to / 10 ) ) + 10;
      var dx = x1 - x2,
        dy = y1 - y2,
        dr = Math.sqrt(dx * dx + dy * dy);
      return "M" + x1 + "," + y1 + "A" + dr + "," + dr +
        " 0 0,1 " + x2 + "," + y2;
    }).attr( 'stroke-width', 2 )
      .attr( 'stroke', '#ff0000')
      .attr( 'fill', 'none' );

  }

  _scales( el ) {
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    var x = d3.scale.linear()
      .range([ 20, width - 20 ])
      .domain([ 0, 10 ]);

    var y = d3.scale.linear()
      .range([ 20, height - 20 ])
      .domain([ 0, 10 ]);

    var z = d3.scale.linear()
      .range([ 5, 20 ])
      .domain([ 1, 100 ]);

    return { x: x, y: y, z: z };
  }
}

export default PopulationGrid;
