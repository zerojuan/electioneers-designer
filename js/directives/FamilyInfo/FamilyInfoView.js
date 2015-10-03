'use strict';

angular.module('paDesignerApp')
  .directive('familyInfoView', function() {
    return {
      templateUrl: 'js/directives/FamilyInfo/familyinfoview.html',
      restrict: 'E',
      transclude: true,
      scope: {
        selectedFamily: '='
      },
      link: function(scope, elm, attr){


        scope.onActionToggle = function(type){
          
        }
      }
    };
  });
