'use strict';

var loader = require('./model/loader.js');

angular.module('paDesignerApp')
  .service('LoaderService', function(){
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
  });
