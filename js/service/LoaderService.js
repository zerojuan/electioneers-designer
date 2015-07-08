'use strict';

var loader = require('./model/loader.js');
var population = require('./model/Population.js');

angular.module('paDesignerApp')
  .service('LoaderService', function(){

    this.GeneratePopulation = function(){
      population.generatePopulation();
    };

    this.HasPopulation = function(){
      population.hasPopulation('db2', function(){

      });

      population.hasPopulation('db3', function(){
        
      });
    }

    this.GetVoter = function(){
      console.log('Getting voter...');
      var person = population.getPerson(50);
      return person;
    };

    this.CreateNewSave = function(){
      return loader.CreateNewSave();
    };

    this.DeleteSave = function(file){
      loader.DeleteSave(file);
      return loader.GetSavedFiles();
    };

    this.RenameSaveFile = function(oldFile, newFile){

    };

    this.GetSavedFiles = function(){
      return loader.GetSavedFiles();
    };

    this.GetGameData = function(name){
      console.log('What is loader: ', loader);
      return loader.GetGameData(name);
    };

    this.SaveGameData = function(path, gameData){
      return loader.SaveGameData(path, gameData);
    };
  });
