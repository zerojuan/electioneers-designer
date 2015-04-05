'use strict';

angular.module('paDesignerApp')
  .controller('GameCtrl', function(GameService, $scope){


    $scope.$watch('game', function(){
      if($scope.game){
        var gameData = GameService.GetGameData($scope.game.name);
        angular.forEach(gameData.districts, function(d){
          d.selected = false;
        });
        $scope.gameData = gameData;
      }
    });

    $scope.onSelectDistrict = function(district){
      console.log('Hey clicked me :' + district.name);
      angular.forEach($scope.gameData.districts, function(d){
        console.log(d.id + ' vs ' + district.id);
        if(district.id === d.id){
          d.selected = !d.selected;                    
        }else{
          d.selected = false;
        }
      });
    };


    $scope.goBack = function(){
      $scope.nav.page = 'Start';
    };
  });
