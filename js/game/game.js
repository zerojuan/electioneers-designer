'use strict';

angular.module('paDesignerApp')
  .controller('GameCtrl', function($scope){
    $scope.goBack = function(){
      $scope.nav.page = 'Start';
    };
  });
