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
      $scope.game = {
        name: LoaderService.CreateNewSave()
      };
    };

    $scope.onLoad = function(game){
      gotoPage('Game');
      $scope.game = game;
    };
  });
