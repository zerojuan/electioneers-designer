'use strict';

angular.module('paDesignerApp')
  .directive('districtInDesign', function(){
    return {
     templateUrl: 'js/directives/districtindesign.html',
     restrict: 'E',
     transclude: true,
     scope: {
       district: '=',
       select: '=onSelect'
     },
     link: function (scope) {
       scope.onSelect = function(){
         console.log('On Select: ');
         scope.select(scope.district);
       };
     }
   };
  });
