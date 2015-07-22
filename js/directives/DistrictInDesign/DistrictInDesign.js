'use strict';

angular.module('paDesignerApp')
  .directive('districtInDesign', function(){
    return {
     templateUrl: 'js/directives/DistrictInDesign/districtindesign.html',
     restrict: 'E',
     transclude: true,
     scope: {
       district: '=',
       select: '=onSelect',
       selectedDistrict: '='
     },
     link: function (scope) {
       scope.onSelect = function(){
         console.log('On Select: ');
         scope.select(scope.district);
       };

       scope.isNeighbor = function(){
         if(!scope.selectedDistrict){
           return;
         }
         var n = _.find(scope.selectedDistrict.neighbors, function(n){
          return n.id === scope.district.id;
          });

        return n;
       };
     }
   };
  });
