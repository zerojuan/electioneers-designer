'use strict';

angular.module('paDesignerApp')
  .directive('actionsEdit', function(){
    return {
     templateUrl: 'js/directives/ActionsEditor/actionsedit.html',
     restrict: 'E',
     transclude: true,
     scope: {
     },
     link: function(scope){
       console.log('Loaded actions editor');
     }
   };
  });
