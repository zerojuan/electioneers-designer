'use strict';

angular.module('paDesignerApp')
  .service('GameService', function(LoaderService){
    var gameData;

    this.GetGameData = function(game, cb){
      gameData = LoaderService.GetGameData(game, cb);
      return gameData;
    };

    this.SaveGameData = function(path, game){
      LoaderService.SaveGameData(path, game);
    };

    this.CreateDistrict = function(){
      return {
        name: 'New District',
        id: Date.now(),
        population: 10,
        kapitanId: gameData.kapitans[0].id,
        kapitan: gameData.kapitans[0],
        neighbors: []
      };
    };
  });
