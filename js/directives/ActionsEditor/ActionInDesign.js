'use strict';

angular.module('paDesignerApp')
  .directive('actionInDesign', function(){
    return {
     templateUrl: 'js/directives/ActionsEditor/actionindesign.html',
     restrict: 'E',
     transclude: true,
     scope: {
       action: '=',
       select: '=onSelect',
       selectedAction: '='
     },
     link: function (scope) {
       scope.onSelect = function(){
         console.log('User selected this action');
         scope.selectedAction = scope.action;
       }
     }
   };

  });
