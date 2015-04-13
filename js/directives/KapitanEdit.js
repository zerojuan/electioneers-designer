'use strict';

angular.module('paDesignerApp')
  .directive('kapitanEdit', function(){
    return {
      templateUrl: 'js/directives/kapitanedit.html',
      restrict: 'E',
      transclude: true,
      scope: {
        kapitan: '='
      },
      link: function (scope) {

      }
    };

  });
