'use strict';

const express = require( 'express' );
const fs = require( 'fs-extra' );
const path = require( 'path' );
const async = require( 'async' );
const _ = require( 'lodash' );
const router = express.Router();

const settings = require( '../settings.js' );
const DefaultGraphics = require( '../data/default-graphics.json' );

const getDefaultDir = function() {
  return settings.getWorkingDirectory();
};


router.get( '/', function( req, res ) {
  var defaultDir = getDefaultDir();

  // check if there is a graphics file
  fs.readFile( defaultDir + '/graphics.json', { encoding: 'utf8' }, function( err, data ) {
    if ( err ) {
      // return default file
      return res.send( DefaultGraphics );
    }

    return res.send( JSON.parse( data ) );
  });
});

router.post( '/', function( req, res ) {
  var defaultDir = getDefaultDir();

  var graphicsConfig = req.body.graphics;

  fs.writeFileSync( defaultDir + '/graphics.json',
    JSON.stringify( graphics, null, '\t' ) );

  return res.send( graphicsConfig );
});

module.exports = router;
