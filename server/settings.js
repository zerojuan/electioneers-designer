'use strict';

var fs = require( 'fs' );

// load settings file
var loadSettings = function() {
  return JSON.parse(
    fs.readFileSync( __dirname + '/data/settings.json', { encoding: 'utf8' })
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
