'use strict';

var path = require( 'path' );

var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var defaultLoadFolder = home + '/PartyAnimalsData';

exports.getWorkingDirectory = function() {
  return defaultLoadFolder;
};
