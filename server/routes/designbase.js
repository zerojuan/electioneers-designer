'use strict';

const express = require( 'express' );
const fs = require( 'fs-extra' );
const path = require( 'path' );
const async = require( 'async' );
const _ = require( 'lodash' );
const Moniker = require( 'moniker' );
const names = Moniker.generator([ Moniker.adjective, Moniker.noun ]);
const router = express.Router();

const settings = require( '../settings.js' );
const DefaultConfig = require( '../data/default-config.json' );
const District = require( '../models/district.js' );
const Population = require( '../models/population.js' );

router.get( '/:name', function( req, res ) {
  const name = req.params.name;

  // load districts and shit
  var defaultDir = settings.getWorkingDirectory() + '/saves/' + name;

  // open files
  async.series({
    districts: function( callback ) {
      fs.readFile( defaultDir + '/districts.json', { encoding: 'utf8' }, function( err, data ) {
        if ( err ) {
          return callback( err );
        }
        var districts = JSON.parse( data ).data;
        return callback( null, districts.map( District.convert ) );
      });
    },
    population: function( callback ) {
      fs.readFile( defaultDir + '/population.json', { encoding: 'utf8' }, function( err, data ) {
        if ( err ) {
          return callback( err );
        }
        var population = JSON.parse( data ).data;
        return callback( null, population.map( Population.convert ) );
      });
    },
    actions: function( callback ) {
      fs.readFile( defaultDir + '/actions.json', { encoding: 'utf8' }, function( err, data ) {
        if ( err ) {
          return callback( err );
        }

        return callback( null, JSON.parse( data ).data );
      });
    },
    config: function( callback ) {
      // your base config should be here
      fs.readFile( defaultDir + '/config.json', { encoding: 'utf8' }, function( err, data ) {
        if ( err ) {
          // supply default config
          return callback( err );
        }

        return callback( null, JSON.parse( data ) );
      });
    }
  }, function( err, results ) {
    if ( err ) {
      console.log( 'Error: ', err );
      return res.status( 404 ).send( err );
    }
    console.log( 'Found files' );
    return res.send( results );
  });
});

router.delete( '/:name', function( req, res ) {
  const name = req.params.name;
  const defaultDir = settings.getWorkingDirectory() + '/saves/' + name;

  fs.removeSync( defaultDir );

  return res.send({
    name: req.params.name
  });
});

// this route will overwrite previous saved folder
router.post( '/:name', function( req, res ) {
  const name = req.params.name;
  const defaultDir = settings.getWorkingDirectory() + '/saves/' + name;

  // save the files here
  async.series({
    createFolder: function( done ) {
      fs.mkdir( defaultDir, function( err, res ) {
        done();
      });
    },
    districts: function( done ) {
      // save districts
      let districts = {
        name: 'Districts',
        data: req.body.districts
      };
      fs.writeFileSync( defaultDir + '/districts.json',
        JSON.stringify( districts, null, '\t' ) );
      done();
    },
    population: function( done ) {
      // save population
      let population = {
        name: 'Population',
        data: req.body.population
      };
      fs.writeFileSync( defaultDir + '/population.json',
        JSON.stringify( population, null, '\t' ) );
      done();
    },
    actions: function( done ) {
      let actions = {
        name: 'Actions',
        data: req.body.actions
      };
      fs.writeFileSync( defaultDir + '/actions.json',
        JSON.stringify( actions, null, '\t' ) );
      done();
    },
    config: function( done ) {
      let config = req.body.config;
      fs.writeFileSync( defaultDir + '/config.json',
        JSON.stringify( config, null, '\t' ) );
      done();
    }
  }, function( err, result ) {
    console.log( 'Responding now....' );
    return res.send({
      name: req.params.name
    });
  });
});

module.exports = router;
