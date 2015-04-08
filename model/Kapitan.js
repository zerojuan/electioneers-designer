'use strict';

var Kapitan = function(id, name){
  var that = this;
  this.id = id;
  this.name = name;

  this.toJson = function(obj){
    if(obj){
      that = obj;
    }
    return {
      id: that.id,
      name: that.name
    };
  };
};


module.exports = Kapitan;
