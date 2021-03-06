'use strict';

const express = require( 'express' );
const fs = require( 'fs-extra' );
const path = require( 'path' );
const async = require( 'async' );
const _ = require( 'lodash' );
const router = express.Router();

const settings = require( '../settings.js' );
const GraphicsModel = require( '../models/graphics' );

const getDefaultDir = function() {
  return settings.getWorkingDirectory();
};


router.get( '/', function( req, res ) {
  var defaultDir = getDefaultDir();
  console.log( 'Getting graphics...' );
  // check if there is a graphics file
  GraphicsModel.loadData(function( err, data ) {
    return res.send( data );
  });
});

router.post( '/', function( req, res ) {
  var defaultDir = getDefaultDir();

  var graphicsConfig = req.body.graphics;

  GraphicsModel.saveData( graphicsConfig, function( err, data ) {
    return res.json( data );
  });
});

router.put( '/:id', function( req, res ) {
  var defaultDir = getDefaultDir();

  var data = typeof req.body.data === 'string' ?
    JSON.parse( req.body.data ) : req.body.data;
  var type = req.body.type;

  GraphicsModel.loadData(function( err, graphics ) {
    // search file based on type
    let index = _.findIndex( graphics[ type ], ( fileData ) =>
      fileData.id === data.id );
    let metadata = graphics[ type ][ index ];
    metadata.name = data.name;
    graphics[ type ] = [
      ...graphics[ type ].slice( 0, index ),
      metadata,
      ...graphics[ type ].slice( index + 1 )
    ];
    GraphicsModel.saveData( graphics, function( err, result ) {
      return res.json({
        data: data,
        type: type
      });
    });
  });
});

router.delete( '/', function( req, res ) {
  var defaultDir = getDefaultDir();
  var data = typeof req.body.data === 'string' ?
    JSON.parse( req.body.data ) : req.body.data;
  var type = req.body.type;

  GraphicsModel.loadData(function( err, graphics ) {
    // search file based on type
    let index = _.findIndex( graphics[ type ], ( fileData ) =>
      fileData.id === data.id );
    let metadata = graphics[ type ][ index ];
    graphics[ type ] = [
      ...graphics[ type ].slice( 0, index ),
      ...graphics[ type ].slice( index + 1 )
    ];
    // delete actual image in gfx folder
    GraphicsModel.deleteFile( metadata, function( err, result ) {
      GraphicsModel.saveData( graphics, function( err, result ) {
        return res.json({
          data: data,
          type: type
        });
      });
    });

  });


});

router.post( '/upload', function( req, res ) {
  GraphicsModel.saveFile( req.file, {
    filename: req.body.name,
    type: req.body.type
  }, function( err ) {
    if ( err ) {
      return res.send( err );
    }

    GraphicsModel.loadData(function( err, data ) {
      return res.send( data );
    });
  });
});

module.exports = router;
