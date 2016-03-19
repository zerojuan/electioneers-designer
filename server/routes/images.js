'use strict';

const express = require( 'express' );
const fs = require( 'fs-extra' );
const path = require( 'path' );
const async = require( 'async' );
const _ = require( 'lodash' );
const router = express.Router();

const settings = require( '../settings.js' );
const GraphicsModel = require( '../models/graphics.js' );

const getDefaultDir = function( name ) {
  return settings.getWorkingDirectory() + '/saves/' + name;
};

router.get( '/:name/bg/:bgName', function( req, res ) {
  var defaultDir = settings.getWorkingDirectory();

  var bgName = req.params.bgName;

  var options = {
    root: defaultDir + '/gfx/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  GraphicsModel.loadData(function( graphicsData ) {
    // search graphics data
    var index = _.findIndex( graphicsData.backgrounds, function( bg ) {
      console.log( bg.id, bgName );
      return bg.id === bgName;
    });

    if ( index < 0 ) {
      index = 0;
    }

    return res.sendFile( graphicsData.backgrounds[ index ].file, options, function( err ) {
      if ( err ) {
        console.log( err );
        res.status( err.status ).end();
      } else {
        console.log( 'Sent:', graphicsData.backgrounds[ index ].file );
      }
    });
  });


});

router.get( '/:name/d/:gfxName', function( req, res ) {
  var defaultDir = settings.getWorkingDirectory();

  var options = {
    root: defaultDir + '/gfx/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var gfxName = req.params.gfxName;

  GraphicsModel.loadData(function( graphicsData ) {
    var index = _.findIndex( graphicsData.districts, function( district ) {
      return district.id === gfxName;
    });

    if ( index < 0 ) {
      index = 0;
    }

    return res.sendFile( graphicsData.districts[ index ].file, options, function( err ) {
      if ( err ) {
        console.log( err );
        res.status( err.status ).end();
      } else {
        console.log( 'Sent:', graphicsData.districts[ index ].file );
      }
    });
  });
});

router.get( '/:name', function( req, res ) {
  var defaultDir = settings.getWorkingDirectory();

  var options = {
    root: defaultDir + '/gfx/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  return res.sendFile( req.params.name, options, function( err ) {
    if ( err ) {
      console.log( err );
      res.status( err.status ).end();
    } else {
      console.log( 'Sent: ', req.params.name );
    }
  });
});

module.exports = router;
