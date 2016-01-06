'use strict';

const express = require( 'express' );
const fs = require( 'fs' );
const _ = require( 'lodash' );
const router = express.Router();

const settings = require( '../settings.js' );

router.get( '/', function( req, res ) {
  const defaultDir = settings.getWorkingDirectory();

  // check if file exists
  if ( !fs.existsSync( defaultDir ) ) {
    fs.mkdirSync( defaultDir, function( err ) {
      if ( err ) {
        console.log( 'Error creating default directory' );
      }
    });
  }

  if ( !fs.existsSync( defaultDir + '/saves' ) ) {
    fs.mkdirSync( defaultDir + '/saves' );
  }

  const dirs = fs.readdirSync( defaultDir + '/saves' );
  let ret = [];
  _.forEach( dirs, function( dir ) {
    let stat = fs.statSync( defaultDir + '/saves/' + dir );
    if ( stat.isDirectory() ) {
      ret.push({
        name: dir,
        lastModified: stat.mtime
      });
    }
  });

  res.send( ret );
});

module.exports = router;
