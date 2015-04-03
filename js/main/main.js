'use strict';

angular.module('paDesignerApp')
  .controller('MainCtrl', function(LoaderService, $scope){
    $scope.page = 'Start';

    $scope.savedFiles = LoaderService.GetSavedFiles();

    var gotoPage = function(page){
      $scope.page = page;
    };

    $scope.onNew = function(){
      gotoPage('Game');
      $scope.gameName = LoaderService.CreateNewSave();
    };

    $scope.onLoad = function(name){
      gotoPage('Game');
      $scope.gameName = name;
    };
  });
