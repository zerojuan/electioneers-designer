'use strict';

angular.module('paDesignerApp')
  .directive('geographicView', function() {
    return {
      templateUrl: 'js/directives/Geographic/geographicview.html',
      restrict: 'E',
      transclude: true,
      scope: {
        population: '=',
        districts: '='
      },
      link: function(scope) {
        
      }
    };
  });
