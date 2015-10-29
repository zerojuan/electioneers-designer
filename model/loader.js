'use strict';

var fs = require('fs-extra');
var _ = require('underscore');
var Moniker = require('moniker');
var names = Moniker.generator([Moniker.adjective, Moniker.noun]);
var settings = require('../settings.js');
var District = require('./District.js');
var Kapitan = require('./Kapitan.js');

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

var KapitansFromFile = function(filePath){
  var data = loadData(filePath);
  var kapitans = _.map(data.data, function(d){
    return new Kapitan(d.id, d.name);
  });

  return kapitans;
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
  saveData(folderName+'/kapitans.json', loadData(defaultDir+'/kapitans.json'));
  saveData(folderName+'/population.json', loadData(defaultDir+'/population.json'));

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

var GetGameData = function(path){
  var defaultDir = settings.getWorkingDirectory() + '/saves/' + path;

  //open kapitans
  var kapitans = JSON.parse(fs.readFileSync(defaultDir+'/kapitans.json', {encoding: 'utf8'}));
  var districts = JSON.parse(fs.readFileSync(defaultDir+'/districts.json', {encoding: 'utf8'}));
  var population = JSON.parse(fs.readFileSync(defaultDir+'/population.json', {encoding: 'utf8'}));

  // TODO: setup actions for file saving
  return {
    kapitans: kapitans.data,
    districts: districts.data,
    population: population.data,
    actions: []
  };
};

var SaveGameData = function(path, data){
  var defaultDir = settings.getWorkingDirectory() + '/saves/' + path;

  //save kapitans
  var kapitans = {
    name: 'Kapitans',
    data: _.map(data.kapitans, function(k){
      var kap = new Kapitan();
      return kap.toJson(k);
    })
  };
  fs.writeFileSync(defaultDir+'/kapitans.json', JSON.stringify(kapitans, null, '\t'));

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

  return;
};

exports.DistrictsFromFile = DistrictsFromFile;

exports.KapitansFromFile = KapitansFromFile;

exports.CreateNewSave = CreateNewSave;

exports.GetSavedFiles = GetSavedFiles;

exports.GetGameData = GetGameData;

exports.DeleteSave = DeleteSave;

exports.SaveGameData = SaveGameData;
