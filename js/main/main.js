'use strict';

angular.module('paDesignerApp')
  .controller('MainCtrl', function($scope){
    $scope.page = 'Start';

    var gotoPage = function(page){
      $scope.page = page;
    };

    $scope.onNew = function(){
      gotoPage('Game');
    };


  });
