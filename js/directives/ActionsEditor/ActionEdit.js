'use strict';

angular.module('paDesignerApp')
  .directive('actionEdit', function(){
    return {
     templateUrl: 'js/directives/ActionsEditor/actionedit.html',
     restrict: 'E',
     transclude: true,
     scope: {
       action: '='
     },
     link: function(scope){
       console.log('Loaded actions editor');
     }
   };
  });
