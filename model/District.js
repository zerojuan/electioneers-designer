'use strict';

var fs = require('fs');
var _ = require('underscore');

var District = function(id, name, gdp, kapitanId){
  var that = this;
  this.id = id;
  this.name = name;
  this.gdp = gdp;
  this.kapitanId = kapitanId;
  this.neighbors = [];

  this.toJson = function(obj){
    if(obj){
      that = obj;
    }

    return {
        id: that.id,
        name: that.name,
        gdp: that.gdp,
        kapitanId: that.kapitanId,
        neighbors: that.neighbors
      };
  };
};

module.exports = District;
