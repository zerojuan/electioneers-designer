'use strict';

var fs = require('fs');
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
}

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
  console.log('Name: ' + name);
  while(fs.existsSync(defaultDir+'/saves/'+name)){
    name = names.choose();
  }

  var folderName = defaultDir+'/saves/'+name;

  fs.mkdirSync(folderName);

  saveData(folderName+'/districts.json', loadData(defaultDir+'/districts.json'));
  saveData(folderName+'/kapitans.json', loadData(defaultDir+'/kapitans.json'));

  return name;
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

exports.DistrictsFromFile = DistrictsFromFile;

exports.KapitansFromFile = KapitansFromFile;

exports.CreateNewSave = CreateNewSave;

exports.GetSavedFiles = GetSavedFiles;
