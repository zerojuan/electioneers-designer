const fs = require( 'fs-extra' );
const path = require( 'path' );
const async = require( 'async' );

const DefaultGraphics = require( '../data/default-graphics.json' );
const settings = require( '../settings.js' );

const getDefaultDir = function() {
  return settings.getWorkingDirectory();
};

module.exports = {
  saveData: function( data, cb ) {
    var defaultDir = getDefaultDir();
    fs.writeFileSync( defaultDir + '/graphics.json',
      JSON.stringify( data, null, '\t' ) );

    return cb( data );
  },
  saveFile: function( file, metadata ) {
    // save to directory
    // save metadata
  },
  loadData: function( cb ) {
    var defaultDir = getDefaultDir();
    fs.readFile( defaultDir + '/graphics.json', { encoding: 'utf8' }, function( err, data ) {
      if ( err ) {
        // return default file
        // copy gfx folder to the save folder
        fs.copySync( path.resolve( __dirname, '../data/gfx' ), defaultDir + '/gfx' );
        return cb( DefaultGraphics );
      }

      return cb( JSON.parse( data ) );
    });
  },
  convert: function( graphics ) {
    // pass through for now
    return graphics;
  }
};
