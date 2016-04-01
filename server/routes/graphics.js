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
  GraphicsModel.loadData(function( data ) {
    return res.send( data );
  });
});

router.post( '/', function( req, res ) {
  var defaultDir = getDefaultDir();

  var graphicsConfig = req.body.graphics;

  GraphicsModel.saveData( graphicsConfig, function( data ) {
    return res.send( data );
  });
});

router.post( '/upload', function( req, res ) {
  console.log( 'This is the req: ', req.body );
  console.log( 'This is the file: ', req.file );
  GraphicsModel.saveFile( req.file, {
    filename: req.body.filename,
    type: req.body.type
  }, function( err ) {
    GraphicsModel.loadData(function( data ) {
      return res.send( data );
    });
  });
});

module.exports = router;
