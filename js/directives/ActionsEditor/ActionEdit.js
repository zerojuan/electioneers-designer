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
       scope.types = [
         {
           id: 'district',
           name: 'District'
         },
         {
           id: 'family',
           name: 'Family'
         }
       ];
     }
   };
  });
