'use strict';

angular.module('paDesignerApp')
  .directive('kapitanEdit', function(){
    return {
      templateUrl: 'js/directives/kapitanedit.html',
      restrict: 'E',
      transclude: true,
      scope: {
        kapitan: '=',
        onDelete: '='
      },
      link: function (scope) {
        scope.mode = 'Edit';
        
        scope.onEditView = function(){
          scope.mode = 'Edit';
        };

        scope.onSaveView = function(){
          scope.mode = 'View';
        };

        scope.onDeleteClicked = function(){
          scope.onDelete(scope.kapitan);
        };
      }
    };

  });
