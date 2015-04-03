'use strict';

var fs = require('fs');
var _ = require('underscore');

var District = function(id, name, population, kapitanId){
  var that = this;
  this.id = id;
  this.name = name;
  this.population = population;
  this.kapitanId = kapitanId;

  this.toJson = function(){
    return {
      id: id,
      name: name,
      population: population,
      kapitanId: kapitanId
    };
  };
};

module.exports = District;
