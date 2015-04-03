'use strict';

var fs = require('fs');
var _ = require('underscore');
var District = require('./District.js');
var Kapitan = require('./Kapitan.js');

var loadData = function(path){
  return JSON.parse(fs.readFileSync(path, {encoding: 'utf8'}));
};

exports.DistrictsFromFile = function(filePath){
  var data = loadData(filePath);
  var districts = _.map(data.data, function(d){
    return new District(d.id, d.name, d.population, d.kapitanId);
  });

  return districts;
};

exports.KapitansFromFile = function(filePath){
  var data = loadData(filePath);
  var kapitans = _.map(data.data, function(d){
    return new Kapitan(d.id, d.name);
  });

  return kapitans;
};
