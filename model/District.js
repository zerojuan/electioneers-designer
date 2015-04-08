'use strict';

var fs = require('fs');
var _ = require('underscore');

var District = function(id, name, population, kapitanId){
  var that = this;
  this.id = id;
  this.name = name;
  this.population = population;
  this.kapitanId = kapitanId;
  this.neighbors = [];

  this.toJson = function(obj){
    if(obj){
      that = obj;
    }

    return {
        id: that.id,
        name: that.name,
        population: that.population,
        kapitanId: that.kapitanId,
        neighbors: that.neighbors
      };    
  };
};

module.exports = District;
