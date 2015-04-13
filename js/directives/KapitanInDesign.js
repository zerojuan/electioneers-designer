'use strict';

angular.module('paDesignerApp')
  .directive('kapitanInDesign', function(){
    return {
      templateUrl: 'js/directives/kapitanindesign.html',
      restrict: 'E',
      transclude: true,
      scope: {
        kapitan: '=',
        select: '=onSelect'
      },
      link: function (scope) {
        scope.onClicked = function(){
          scope.select(scope.kapitan);
        };
      }
    };
  });
