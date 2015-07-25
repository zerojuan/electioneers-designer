'use strict';

angular.module('paDesignerApp')
  .directive('populationGraph', function(){
    return {
      templateUrl: 'js/directives/PopulationGraph/populationGraph.html',
      restrict: 'E',
      scope: {
        population: '=',
        selected: '='
      },
      link: function(scope){
        scope.onClick = function(family){
          scope.selected = family;
        }
      }
    }
  });
