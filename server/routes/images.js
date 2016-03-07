'use strict';

const express = require( 'express' );
const fs = require( 'fs-extra' );
const path = require( 'path' );
const async = require( 'async' );
const _ = require( 'lodash' );
const router = express.Router();

const settings = require( '../settings.js' );

const getDefaultDir = function( name ) {
  return settings.getWorkingDirectory() + '/saves/' + name;
};

router.get( '/:name/background', function( req, res ) {
  var defaultDir = getDefaultDir( req.params.name );

  var options = {
    root: defaultDir + '/gfx/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  return res.sendFile( 'rainbow-bg.png', options, function( err ) {
    if ( err ) {
      console.log( err );
      res.status( err.status ).end();
    } else {
      console.log( 'Sent:', ' rainbow-bg.png' );
    }
  });
});

router.get( '/:name/d/:gfxName', function( req, res ) {
  var defaultDir = getDefaultDir( req.params.name );

  var options = {
    root: defaultDir + '/gfx/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  return res.sendFile( req.params.gfxName + '.png', options, function( err ) {
    if ( err ) {
      console.log( err );
      res.status( err.status ).end();
    } else {
      console.log( 'Sent:', req.params.gfxName + '.png' );
    }
  });
});

module.exports = router;
