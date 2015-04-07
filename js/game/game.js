'use strict';

angular.module('paDesignerApp')
  .controller('GameCtrl', function(GameService, $scope){
    $scope.selected = {};

    $scope.$watch('game', function(){
      if($scope.game){
        var gameData = GameService.GetGameData($scope.game.name);
        angular.forEach(gameData.districts, function(d){
          d.selected = false;
          //find kapitan
          var kap = _.find(gameData.kapitans, function(k){
            return k.id === d.kapitanId;
          });
          d.kap = kap;
          d.neighbors = [];
          d.addNeighbor = function(n){
            d.neighbors.push({
              id: n.id,
              name: n.name
            });
          };
          d.removeNeighbor = function(n){
            d.neighbors = _.reject(d.neighbors, function(dn){
              return dn.id === n.id;
            });
          };
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

    $scope.onSave = function(){
      //save game data to the file in this folder
    };


    $scope.goBack = function(){
      $scope.nav.page = 'Start';
    };
  });
