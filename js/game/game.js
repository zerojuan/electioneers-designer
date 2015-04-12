'use strict';

angular.module('paDesignerApp')
  .controller('GameCtrl', function(DistrictsModel, GameService, $scope){
    $scope.selected = {};

    $scope.$watch('game', function(){
      if($scope.game){
        var gameData = GameService.GetGameData($scope.game.name);
        gameData.districts = _.map(gameData.districts, function(d){
          if(!d.neighbors){
            d.neighbors = [];
          }

          d = new DistrictsModel.District(d);
          d.setKap(gameData.kapitans);

          return new DistrictsModel.District(d);
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
          if(d.selected){
            $scope.selected.district = d;
          }else{
            $scope.selected.district = null;
          }
        }else{
          d.selected = false;
        }
      });
    };

    $scope.onNewDistrict = function(){
      var d = DistrictsModel.CreateDistrict($scope.gameData.kapitans);
      $scope.gameData.districts.push(d);
    };

    $scope.onDeleteDistrict = function(district){
      $scope.gameData.districts = _.reject($scope.gameData.districts, function(d){
        return d.id === district.id;
      });
      //delete from neighbor hoods
      _.forEach($scope.gameData.districts, function(d){
        d.neighbors = _.reject(d.neighbors, function(n){
          return n.id === district.id;
        });
      });
    };

    $scope.onSave = function(){
      //save game data to the file in this folder
      GameService.SaveGameData($scope.game.name, $scope.gameData);
    };


    $scope.goBack = function(){
      $scope.nav.page = 'Start';
    };
  });
