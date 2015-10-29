'use strict';

angular.module('paDesignerApp')
  .directive('districtEdit', function(){
    return {
     templateUrl: 'js/directives/DistrictEdit/districtedit.html',
     restrict: 'E',
     transclude: true,
     scope: {
       district: '=',
       districts: '=',
       onDelete: '='
     },
     link: function (scope) {
       scope.mode = 'Edit';

       scope.selectedDistrict = null;

       scope.onEditView = function(){
         scope.mode = 'Edit';
       };

       scope.onSaveView = function(){
         scope.mode = 'View';
       };

        scope.onDeleteClicked = function(){
          scope.onDelete(scope.district);
        };

       scope.removeCurrentDistrict = function(value){
          if(!scope.district){
            return false;
          }
          var val = _.find(scope.district.neighbors, function(d){
            return (value.id === d.id);
          });
          console.log('Found?', val);
          if(val){
            return false;
          }

          return value.id !== scope.district.id;
        };

        scope.addNeighbor = function(d){
          if(!d){
            return false;
          }
          scope.district.addNeighbor(d);
          d.addNeighbor(scope.district);
        };

        scope.removeNeighbor = function(d){
          scope.district.removeNeighbor(d);
          var district = _.find(scope.districts, function(d1){
            return d1.id === d.id;
          });
          district.removeNeighbor(scope.district);
        };

        scope.showNeighborName = function(d){
          var district = _.find(scope.districts, function(d1){
            return d1.id === d.id;
          });
          if(district){
            return district.name;
          }else{
            return d.name;
          }

        };
      }
   };
  });
