'use strict';

angular.module('paDesignerApp')
  .service('ElectionEngine', function(){

    this.UpdatePopulation = function(population){
      console.log('Updating population...', population);
    };

    this.attachMoveList = function(family, candidate){
      //search moves
      if(!family.moves){
        family.moves = [];
      }

      if(!family.moves[candidate.family._id] || (family.moves[candidate.family._id].length < 0)){
        family.moves[candidate.family._id] = [];
      }

      return family;
    };

    /**
     * Mutate family to have an opinion of this candidate, default to 1
     */
    this.attachOpinion = function(family, candidate){
      if(!family.opinion){
        family.opinion = [];
      }

      if(!family.opinion[candidate.family._id]){
        family.opinion[candidate.family._id] = 1;
      }

      return family;
    };

    /**
     * Mutate family to update the opinion on this candidate
     */
    this.updateOpinion = function(family, candidate, value){
      if(!family.opinion){
        this.attachOpinion(family, candidate);
      }

      family.opinion[candidate.family._id] = value;

      return family;
    };
  });
