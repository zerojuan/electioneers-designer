'use strict';

angular.module('paDesignerApp')
  .controller('GameCtrl', function(GameService, $scope){


    $scope.$watch('game', function(){
      if($scope.game){
        var gameData = GameService.GetGameData($scope.game.name);
        $scope.gameData = gameData;
      }

    });


    $scope.goBack = function(){
      $scope.nav.page = 'Start';
    };
  });
