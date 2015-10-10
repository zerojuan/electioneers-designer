'use strict';

angular.module('paDesignerApp')
  .directive('gameFooter', function() {
    return {
      templateUrl: 'js/directives/GameFooter/gamefooter.html',
      restrict: 'E',
      transclude: true,
      scope: {
        selectedDistrict: '=',
        currentCandidate: '=',
        onNext: '=',
        day: '='
      },
      link: function(scope,elm) {

      }
    };
  });
