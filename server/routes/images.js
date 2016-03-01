'use strict';

const express = require( 'express' );
const fs = require( 'fs-extra' );
const path = require( 'path' );
const async = require( 'async' );
const _ = require( 'lodash' );
const router = express.Router();

const settings = require( '../settings.js' );

router.get( '/:name/background', function( req, res ) {
  const name = req.params.name;
  console.log( 'Trying to load: ', name );
  var defaultDir = settings.getWorkingDirectory() + '/saves/' + name;

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

module.exports = router;
