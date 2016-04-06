const fs = require( 'fs-extra' );
const path = require( 'path' );
const async = require( 'async' );
const _ = require( 'lodash' );

const DefaultGraphics = require( '../data/default-graphics.json' );
const settings = require( '../settings.js' );

const utils = require( '../utils.js' );

const getDefaultDir = function() {
  return settings.getWorkingDirectory();
};

module.exports = {
  saveData: function( data, cb ) {
    var defaultDir = getDefaultDir();
    fs.writeFileSync( defaultDir + '/graphics.json',
      JSON.stringify( data, null, '\t' ) );

    return cb( null, data );
  },
  saveFile: function( file, metadata, cb ) {
    // save to directory
    var generatedFilename = utils.guid() + '.png';

    var defaultDir = getDefaultDir();
    fs.writeFileSync( defaultDir + '/gfx/' + generatedFilename,
      file.buffer );

    // save based on metadata
    var that = this;
    this.loadData(function( err, data ) {
      // save metadata
      data[ metadata.type ].push({
        id: generatedFilename,
        name: metadata.filename,
        file: generatedFilename
      });
      that.saveData( data, function( err, result ) {
        return cb( err, result );
      });
    });
  },
  loadData: function( cb ) {
    var defaultDir = getDefaultDir();
    fs.readFile( defaultDir + '/graphics.json', { encoding: 'utf8' }, function( err, data ) {
      if ( err ) {
        // return default file
        // copy gfx folder to the save folder
        fs.copySync( path.resolve( __dirname, '../data/gfx' ), defaultDir + '/gfx' );
        return cb( null, DefaultGraphics );
      }

      return cb( err, JSON.parse( data ) );
    });
  },
  convert: function( graphics ) {
    // pass through for now
    return graphics;
  }
};
