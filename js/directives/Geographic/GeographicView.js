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
      link: function(scope,elm) {
        var svg = d3.select(elm[0])
            .select('svg');

        var renderGeomap = function(){
          //TODO: add rendering here
        };

        svg.append('g');

        renderGeomap();
      }
    };
  });
