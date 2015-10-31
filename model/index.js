'use strict';

var fs = require('fs');
var settings = require('../settings.js');
var loader = require('./loader.js');
var District = require('./District.js');

var createDistricts = function(){
  var districts = [
    new District('1', 'Portlandia', 2000, '1').toJson(),
    new District('2', 'Manila', 2000, '2').toJson(),
    new District('3', 'Manukau', 3000, '3').toJson(),
    new District('4', 'Shredderland', 5000, '4').toJson(),
    new District('5', 'Elephs', 10000, '5').toJson()
  ];

  return districts;
};

var createPopulation = function(){
  // TODO: should generate a default population
  var population = [
  ];

  return population;
};

var createActions = function(){
  // TODO: should generate a default actions
  var actions = [];

  return actions;
};

exports.init = function(){
    var defaultDir = settings.getWorkingDirectory();
    //check if file exists
    if(!fs.existsSync(defaultDir)){

      fs.mkdirSync(defaultDir, function(err){
        if(err){
          console.log('Error creating default directory');
        }
      });
    }

    if(!fs.existsSync(defaultDir+'/saves')){
      fs.mkdirSync(defaultDir+'/saves');
    }

    fs.open(defaultDir+'/districts.json', 'r+', function(err){
      var districts;
      if(err){
          console.log('Cannot find districts file...');
          districts = {
            name: 'Districts',
            data: createDistricts()
          };
          fs.writeFile(defaultDir+'/districts.json', JSON.stringify(districts, null, '\t'), function(err){
            if(err){
              console.log('Unable to write districts.json');
            }
          });
      }else{
        //load data
        districts = loader.DistrictsFromFile(defaultDir+'/districts.json');
        console.log('Loaded districts: ' + districts.length);
      }
    });

    fs.open(defaultDir+'/population.json', 'r+', function(err){
      var population;
      if(err){
          console.log('Cannot find population file...');
          population = {
            name: 'Population',
            data: createPopulation()
          };
          fs.writeFile(defaultDir+'/population.json', JSON.stringify(population, null, '\t'), function(err){
            if(err){
              console.log('Unable to write population.json');
            }
          });
      }else{
        //load data
        population = loader.DistrictsFromFile(defaultDir+'/population.json');
        console.log('Loaded population: ' + population.length);
      }
    });

    fs.open(defaultDir+'/actions.json', 'r+', function(err){
      var actions;

      if(err){
        console.log('Cannot find actions file...');
        actions = {
          name: 'Actions',
          data: createActions()
        };
        fs.writeFile(defaultDir+'/actions.json', JSON.stringify(actions, null, '\t'), function(err){
          if(err){
            console.log('Unable to write actions.json');
          }
        });
      }else{
        //load data
        actions = loader.ActionsFromFile(defaultDir+'/actions.json');
        console.log('Loaded actions: ' + actions.length);
      }
    });
};
