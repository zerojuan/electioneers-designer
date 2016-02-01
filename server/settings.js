'use strict';

var fs = require( 'fs' );
var path = require( 'path' );

// load settings file
var loadSettings = function() {
  return JSON.parse(
    fs.readFileSync( path.join( __dirname, '/data/settings.json' ),
      { encoding: 'utf8' })
  );
};


var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var defaultLoadFolder = home + '/PartyAnimalsData';

exports.getWorkingDirectory = function() {
  var settings = loadSettings();
  if ( settings.workingFolder === 'default' ) {
    return defaultLoadFolder;
  } else {
    return settings.workingFolder;
  }
};

exports.setWorkingDirectory = function( path ) {
  var settings = loadSettings();
  settings.workingFolder = path;
  fs.writeFileAsync( 'data/settings.json', JSON.stringify( settings, null, '\t' ) );
};
