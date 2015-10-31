'use strict';

var loader = require('./model/loader.js');
var population = require('./model/Population.js');

angular.module('paDesignerApp')
  .service('LoaderService', function($q){

    this.GeneratePopulation = function(done){
      console.log('Trying to generate');
      population.generatePopulation(done);
    };

    this.DeletePopulation = function(dbName, done){
      console.log('Deleting a database');
      population.deletePopulation(dbName, done);
    };

    this.HasPopulation = function(dbName){
      var deferred = $q.defer();
      population.hasPopulation(dbName, function(result){
        if(result.doc_count > 0){
          //has population
          deferred.resolve(true);
        }else{
          //has no population
          deferred.resolve(false);
        }
      });

      return deferred.promise;
    };

    this.GetFamilies = function(dbName, startKey){
      var family = population.getFamilies(dbName, startKey);
      return family;
    };

    this.GetVoter = function(){
      var person = population.getPerson(50);
      console.log('This is the person: ', person);
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

    this.GetGameData = function(name, cb){
      console.log('What is loader: ', loader);
      return loader.GetGameData(name, cb);
    };

    this.SaveGameData = function(path, gameData){
      return loader.SaveGameData(path, gameData);
    };
  });
