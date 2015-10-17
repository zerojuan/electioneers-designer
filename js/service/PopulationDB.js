'use strict';

angular.module('paDesignerApp')
  .service('PopulationDB', function(){
    this.findDistrictById = function(id, districts){
      return _.find(districts, function(d){
        return d.id === id;
      });
    };

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

    this.getRandomFamily = function(population){
      return _.sample(population);
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

    /**
     * Mutates family. Attaches children to father.sons, father.daughters, mother.sons, mother.daughters
     */
     this.loadSiblings = function(family, population){
       //load siblings
       if(family.father){
         this.loadChildren(family.father, population, family);
         _.forEach(family.father.sons, function(son){
           this.loadChildren(son, population);
         });
         _.forEach(family.father.daughters, function(daughter){
           this.loadChildren(daughter, population);
         });
       }

       if(family.mother){
         this.loadChildren(family.mother, population, family);
         _.forEach(family.mother.sons, function(son){
           this.loadChildren(son, population);
         });
         _.forEach(family.mother.daughters, function(daughter){
           this.loadChildren(daughter, population);
         });
       }
     };

  });
