'use strict';

angular.module('paDesignerApp')
  .directive('districtEdit', function(){
    return {
     templateUrl: 'js/directives/districtedit.html',
     restrict: 'E',
     transclude: true,
     scope: {
       district: '=',
       districts: '=',
       kapitans: '='
     },
     link: function (scope) {
       scope.mode = 'Edit';

       scope.selectedDistrict = null;

       scope.onEditView = function(){
         scope.mode = 'Edit';
       };

       scope.onSaveView = function(){
         scope.mode = 'View';
       };
     }
   };
  });
