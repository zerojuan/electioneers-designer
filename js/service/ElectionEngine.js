'use strict';

angular.module('paDesignerApp')
  .service('ElectionEngine', function(){

    this.UpdatePopulation = function(population){
      console.log('Updating population...', population);
    };

    this.attachMoveList = function(family, candidate){
      //search moves
      if(!family.moves){
        family.moves = {};
      }
      family.moves[candidate.family._id] = [];

      console.log('Family added moves', candidate);
    };
  });
