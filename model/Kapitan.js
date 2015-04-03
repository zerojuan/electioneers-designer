'use strict';

var Kapitan = function(id, name){
  this.id = id;
  this.name = name;

  this.toJson = function(){
    return {
      id: id,
      name: name
    };
  };
};


module.exports = Kapitan;
