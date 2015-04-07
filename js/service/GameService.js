'use strict';

angular.module('paDesignerApp')
  .service('GameService', function(LoaderService){
    var gameData;
    this.GetGameData = function(game){
      gameData = LoaderService.GetGameData(game);
      return gameData;
    };
  });