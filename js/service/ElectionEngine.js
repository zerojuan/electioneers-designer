'use strict';

angular.module('paDesignerApp')
  .service('ElectionEngine', function(){

    this.initializePopulation = function(population, candidates){
      var that = this;

      _.forEach(population, function(family){
        _.forEach(candidates, function(candidate){
          that.attachOpinion(family, candidate);
          that.attachActions(family, candidate);
        });
      });
    };

    this.UpdatePopulation = function(population, candidates){
      console.log('Updating population...', population);
      _.forEach(population, function(family){
        _.forEach(candidates, function(candidate){
          //look up each action
          //TODO: Make a more robust implementation of updating
          _.forEach(family.actions[candidate.family._id], function(action){
            family.opinion[candidate.family._id] += 30;
          });

          //add it to effect


          //aggregate effect

          //update relatives and special rivalries

          family.actions[candidate.family._id] = [];
        });
      });
    };

    this.attachMoveList = function(family, candidate, actions){
      //search moves
      if(!family.moves){
        family.moves = [];
      }

      if(!family.moves[candidate.family._id] || (family.moves[candidate.family._id].length < 0)){
        family.moves[candidate.family._id] = actions
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

    this.attachActions = function(family, candidate){
      if(!family.actions){
        family.actions = [];
      }

      if(!family.actions[candidate.family._id]){
        family.actions[candidate.family._id] = [];
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
