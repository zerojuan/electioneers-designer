'use strict';

const express = require( 'express' );
const fs = require( 'fs' );
const _ = require( 'lodash' );
const Moniker = require( 'moniker' );
const names = Moniker.generator([ Moniker.adjective, Moniker.noun ]);
const router = express.Router();

const settings = require( '../settings.js' );

const loadData = function( path ) {
  return JSON.parse( fs.readFileSync( path, { encoding: 'utf8' }) );
};

const saveData = function( path, data ) {
  fs.writeFileSync( path, JSON.stringify( data, null, '\t' ) );
};

router.post( '/add', function( req, res ) {
  var defaultDir = settings.getWorkingDirectory();
  var name = names.choose();

  while ( fs.existsSync( defaultDir + '/saves/' + name ) ) {
    name = names.choose();
  }

  var folderName = defaultDir + '/saves/' + name;

  fs.mkdirSync( folderName );

  saveData( folderName + '/districts.json', loadData( defaultDir + '/districts.json' ) );
  saveData( folderName + '/population.json', loadData( defaultDir + '/population.json' ) );
  saveData( folderName + '/actions.json', loadData( defaultDir + '/actions.json' ) );


  return res.send({
    name: name,
    lastModified: ( new Date() ).toString()
  });
});

router.delete( '/:name', function( req, res ) {
  console.log( req.params.name );
  return res.send({
    name: req.params.name
  });
});

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
