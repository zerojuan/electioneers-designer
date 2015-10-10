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
    };

    this.lookupChildren = function(children, population, exception){
      return _.filter(children, function(_id){
          // don't load if this is the exception
          return !(exception && _id === exception._id);
        }).map(function(_id){
          //query the entire population
          var child = _.find(population, function(f){
            return f._id === _id;
          });

          return child;
        });
    }

    /**
     * Mutates the family parameter, attaches .sons and .daughters
     */
    this.loadChildren = function(family, population, exception){
      //load children
      if(family.children.males.length){
        family.sons = this.lookupChildren(family.children.males, population, exception);
      }

      if(family.children.females.length){
        family.daughters = this.lookupChildren(family.children.females, population, exception);
      }
    };

    /**
     * Mutates the family parameter, attaches .mother and .father
     */
    this.loadParents = function(family, population){
      //populate mother
      family.mother = _.find(population, function(f){
        return f._id === family.parent.mother;
      });

      family.father = _.find(population, function(f){
        return f._id === family.parent.father;
      });
    };
  });
