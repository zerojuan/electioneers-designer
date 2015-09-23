'use strict';

angular.module('paDesignerApp')
  .service('PopulationDB', function(){
    this.getAllInDistrict = function(population, districtId){
      var result = [];

      result = _.filter(population, function(family){
        return family.district.id === districtId;
      });

      return result;
    };

    this.countPopulationInDistrict = function(population, districtId){
      return _.reduce(population, function(total, family){
        if(family.district.id === districtId){
          return total += family.voters + family.kids;
        }
        return total;
      }, 0);
    }
  });
