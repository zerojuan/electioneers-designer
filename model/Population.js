'use strict';
var PouchDB = require('pouchdb');
var Family = require('./Family.js');


function connect(dbName, callback){
  var db = new PouchDB(dbName, { db: require('level-js') });
  db.info().then(function(result){
    if(callback){
      callback(result);
    }
  });
  return db;
}
//TODO: Generate generations based on families

exports.hasPopulation = function(dbName, done){
  connect(dbName, function(result){
    console.log('info:',result);
  });
};

exports.generatePopulation = function(done){
  var db = connect('db2');
  var population = [];
  var i = 0;
  var size = 1000;
  for(i = 0; i < size; i++){
    var voter = new Family();
    voter.name = i+'abcdefghijklmnop'+i;
    voter.gender = 'M';
    voter._id = i+'';
    population.push(voter);
  }
  console.log('Here');
  for(i = 0; i < size; i++){
    db.put(population[i])
      .then(function(){

      })
      .catch(function(err){

        if(err.message === 'Document update conflict'){
          return;
        }
        console.log('Error...', err);
      });
  }
};

exports.getPerson = function(id){
  console.log('Getting person...');
  var db = connect('db2');
  return db.get(id+'');
};
