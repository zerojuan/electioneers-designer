'use strict';

angular.module('paDesignerApp')
  .service('PopulationDB', function(){
    this.getAllInDistrict = function(population, districtId){
      var result = [];

      result = _.filter(population, function(family){
        return family.district.id === districtId;
      });

      return result;
    }
  });
