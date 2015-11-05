'use strict';

angular.module('paDesignerApp')
  .directive('familyInfoView', function(ElectionEngine) {
    return {
      templateUrl: 'js/directives/FamilyInfo/familyinfoview.html',
      restrict: 'E',
      transclude: true,
      scope: {
        selectedFamily: '=',
        candidate: '=',
        actions: '='
      },
      link: function(scope, elm, attr){

        scope.addAction = function(action){
          // should not allow duplicates
          var actions = scope.selectedFamily.actions[scope.candidate.family._id];
          var found = _.find(actions, function(a){
            if(a.id === action.id){
              return a;
            }
          });

          if(!found){
            actions.push(action);
          }
        };

        scope.removeAction = function(action){
          _.remove(scope.selectedFamily.actions[scope.candidate.family._id], function(a){
            return a === action;
          });
        };

        scope.$watch('selectedFamily', function(){
          if(scope.selectedFamily){
            //Move list should be contextual, depending on the current status of the
            ElectionEngine.attachMoveList(scope.selectedFamily, scope.candidate, scope.actions);
          }
        });
      }
    };
  });
