'use strict';

var fs = require('fs-extra');
var _ = require('underscore');
var async = require('async');
var Moniker = require('moniker');
var names = Moniker.generator([Moniker.adjective, Moniker.noun]);
var settings = require('../settings.js');
var District = require('./District.js');

var loadData = function(path){
  return JSON.parse(fs.readFileSync(path, {encoding: 'utf8'}));
};

var saveData = function(path, data){
  fs.writeFileSync(path, JSON.stringify(data, null, '\t'));
};

var DistrictsFromFile = function(filePath){
  var data = loadData(filePath);
  var districts = _.map(data.data, function(d){
    return new District(d.id, d.name, d.population, d.kapitanId);
  });

  return districts;
};

var ActionsFromFile = function(filePath){
  var data = loadData(filePath);
  return data;
};

var CreateNewSave = function(){
  var defaultDir = settings.getWorkingDirectory();
  var name = names.choose();

  while(fs.existsSync(defaultDir+'/saves/'+name)){
    name = names.choose();
  }

  var folderName = defaultDir+'/saves/'+name;

  fs.mkdirSync(folderName);

  saveData(folderName+'/districts.json', loadData(defaultDir+'/districts.json'));
  saveData(folderName+'/population.json', loadData(defaultDir+'/population.json'));
  saveData(folderName+'/actions.json', loadData(defaultDir+'/actions.json'));

  return name;
};

var DeleteSave = function(path){
  var defaultDir = settings.getWorkingDirectory() + '/saves/'+path;

  fs.removeSync(defaultDir);
};

var GetSavedFiles = function(){
  var defaultDir = settings.getWorkingDirectory();

  var dirs = fs.readdirSync(defaultDir+'/saves');
  var ret = [];
  _.forEach(dirs, function(dir){
    var stat = fs.statSync(defaultDir+'/saves/'+dir);
    if(stat.isDirectory()){
      ret.push({
        name: dir,
        lastModified: stat.mtime
      });
    }
  });
  return ret;
};

var GetGameData = function(path, cb){
  var defaultDir = settings.getWorkingDirectory() + '/saves/' + path;

  //open files
  async.series({
    districts: function(callback){
      fs.readFile(defaultDir+'/districts.json', {encoding: 'utf8'}, function(err, data){
        if(err){
          console.log('Error: ', err);
          return callback(null, []);
        }
        return callback(null, JSON.parse(data));
      });
    }
  },{
    population: function(callback){
      fs.readFile(defaultDir+'/population.json', {encoding: 'utf8'}, function(err, data){
        if(err){
          console.log('Error: ', err);
          return callback(null, []);
        }

        return callback(null, JSON.parse(data));
      });
    }
  },{
    actions: function(callback){
      fs.readFile(defaultDir+'/actions.json', {encoding: 'utf8'}, function(err, data){
        if(err){
          console.log('Error: ', err);
          return callback(null, []);
        }

        return callback(null, JSON.parse(data));
      });
    }
  }, function(err, results){
    return cb(results);
  });
};

var SaveGameData = function(path, data){
  var defaultDir = settings.getWorkingDirectory() + '/saves/' + path;

  //save districts
  var districts = {
    name: 'Districts',
    data: _.map(data.districts, function(d){
      var dist = new District();
      d.kapitanId = d.kap.id;
      return dist.toJson(d);
    })
  };
  fs.writeFileSync(defaultDir+'/districts.json', JSON.stringify(districts, null, '\t'));

  //save population
  var population = {
    name: 'Population',
    data: data.population
  };
  fs.writeFileSync(defaultDir+'/population.json', JSON.stringify(population, null, '\t'));

  var actions = {
    name: 'Actions',
    data: data.actions
  };
  fs.writeFileSync(defaultDir+'/actions.json', JSON.stringify(actions, null, '\t'));

  return;
};

exports.DistrictsFromFile = DistrictsFromFile;

exports.ActionsFromFile = ActionsFromFile;

exports.CreateNewSave = CreateNewSave;

exports.GetSavedFiles = GetSavedFiles;

exports.GetGameData = GetGameData;

exports.DeleteSave = DeleteSave;

exports.SaveGameData = SaveGameData;
