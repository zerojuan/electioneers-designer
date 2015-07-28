'use strict';

angular.module('paDesignerApp')
  .directive('voterProfile', function(){
    return {
      templateUrl: 'js/directives/VoterProfile/voterprofile.html',
      restrict: 'E',
      scope: {
        voter: '='
      },
      link: function(scope){
        scope.onClick = function(family){
          scope.selected = family;
        }
      }
    }
  });

angular.module('paDesignerApp')
  .directive('childrenList', function(){
    return {
      templateUrl: 'js/directives/VoterProfile/childrenlist.html',
      restrict: 'E',
      scope: {
        voter: '='
      },
      link: function(scope){
        scope.onClick = function(family){
          scope.selected = family;
        };
      }
    }
  })
