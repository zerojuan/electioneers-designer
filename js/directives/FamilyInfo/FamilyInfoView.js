'use strict';

angular.module('paDesignerApp')
  .directive('familyInfoView', function(ElectionEngine) {
    return {
      templateUrl: 'js/directives/FamilyInfo/familyinfoview.html',
      restrict: 'E',
      transclude: true,
      scope: {
        selectedFamily: '=',
        candidate: '='
      },
      link: function(scope, elm, attr){

        scope.addAction = function(){
          //TODO: should be a real dropdown here
          scope.selectedFamily.moves[scope.candidate.family._id].push({
            name: 'Gift'
          });
        };

        scope.removeAction = function(action){
          _.remove(scope.selectedFamily.moves[scope.candidate.family._id], function(a){
            return a === action;
          });
        };

        scope.onActionToggle = function(type){
          console.log('Toggling action...', type);
          scope.selectedFamily.moves[scope.candidate.family._id][type] = true;
        }

        scope.$watch('selectedFamily', function(){
          if(scope.selectedFamily){
            ElectionEngine.attachMoveList(scope.selectedFamily, scope.candidate);
          }
        });
      }
    };
  });
