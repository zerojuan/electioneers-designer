'use strict';

var fs = require('fs');
var settings = require('../settings.js');
var loader = require('./loader.js');
var District = require('./District.js');
var Kapitan = require('./Kapitan.js');

var createKapitans = function(){
  var kapitans = [
    new Kapitan('1', 'Owlfredo').toJson(),
    new Kapitan('2', 'Manfred').toJson(),
    new Kapitan('3', 'Naked Molerat').toJson(),
    new Kapitan('4', 'Master Shredder').toJson(),
    new Kapitan('5', 'Elephant Man').toJson()
  ];

  return kapitans;
};

var createDistricts = function(){
  var districts = [
    new District('1', 'Portlandia', 2000, '1').toJson(),
    new District('2', 'Manila', 2000, '2').toJson(),
    new District('3', 'Manukau', 3000, '3').toJson(),
    new District('4', 'Shredderland', 5000, '4').toJson(),
    new District('5', 'Elephs', 10000, '5').toJson()
  ];

  return districts;
});

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

    fs.open(defaultDir+'/kapitans.json', 'r+', function(err){
      var kapitans;
      if(err){
        console.log('Cannot find kapitans file...');
        kapitans = {
          name: 'Kapitans',
          data: createKapitans()
        };
        fs.writeFile(defaultDir+'/kapitans.json', JSON.stringify(kapitans, null, '\t'), function(err){
          if(err){
            console.log('Unable to write kapitans.json');
          }
        });
      }else{
        kapitans = loader.KapitansFromFile(defaultDir+'/kapitans.json');
        console.log('Loaded kapitans: ' + kapitans.length);
      }
    });

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

};
