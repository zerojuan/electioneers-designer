'use strict';

angular.module('paDesignerApp')
  .service('ElectionEngine', function(){

    this.UpdatePopulation = function(population){
      console.log('Updating population...', population);
    };


  });
