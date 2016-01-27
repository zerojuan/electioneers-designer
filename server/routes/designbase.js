'use strict';

const express = require( 'express' );
const fs = require( 'fs-extra' );
const async = require( 'async' );
const _ = require( 'lodash' );
const Moniker = require( 'moniker' );
const names = Moniker.generator([ Moniker.adjective, Moniker.noun ]);
const router = express.Router();

const settings = require( '../settings.js' );

router.get( '/:name', function( req, res ) {
  const name = req.params.name;

  // load districts and shit
  var defaultDir = settings.getWorkingDirectory() + '/saves/' + name;

  // open files
  async.series({
    districts: function( callback ) {
      fs.readFile( defaultDir + '/districts.json', { encoding: 'utf8' }, function( err, data ) {
        console.log( 'Read file...', err );
        if ( err ) {
          console.log( 'Error: ', err );
          return callback( null, []);
        }
        return callback( null, JSON.parse( data ).data );
      });
    },
    population: function( callback ) {
      fs.readFile( defaultDir + '/population.json', { encoding: 'utf8' }, function( err, data ) {
        if ( err ) {
          console.log( 'Error: ', err );
          return callback( null, []);
        }

        return callback( null, JSON.parse( data ).data );
      });
    },
    actions: function( callback ) {
      fs.readFile( defaultDir + '/actions.json', { encoding: 'utf8' }, function( err, data ) {
        if ( err ) {
          console.log( 'Error: ', err );
          return callback( null, []);
        }

        return callback( null, JSON.parse( data ).data );
      });
    }
  }, function( err, results ) {
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

router.post( '/:name', function( req, res ) {
  const name = req.params.name;
  const defaultDir = settings.getWorkingDirectory() + '/saves/' + name;

  // save the files here
  async.series({
    districts: function( callback ) {
      // save districts
      let districts = {
        name: 'Districts',
        data: req.body.districts
      };
      fs.writeFileSync( defaultDir + '/districts.json',
        JSON.stringify( districts, null, '\t' ) );
      callback();
    },
    population: function( callback ) {
      // save population
      let population = {
        name: 'Population',
        data: req.body.population
      };
      fs.writeFileSync( defaultDir + '/population.json',
        JSON.stringify( population, null, '\t' ) );
      callback();
    },
    actions: function( callback ) {
      let actions = {
        name: 'Actions',
        data: req.body.actions
      };
      fs.writeFileSync( defaultDir + '/actions.json',
        JSON.stringify( actions, null, '\t' ) );
      callback();
    }
  }, function( err, result ) {
    return res.send({
      name: req.params.name
    });
  });
});

module.exports = router;
