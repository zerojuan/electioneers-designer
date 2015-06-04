'use strict';
var PouchDB = require('pouchdb');
var Voter = require('./Voter.js');


function connect(){
  var db = new PouchDB('db2', { db: require('level-js') });
  db.info().then(function(result){
    console.log('info:',result);
  });
  return db;
}

exports.generatePopulation = function(){
  var db = connect();
  var population = [];
  var i = 0;
  var size = 6000;
  for(i = 0; i < size; i++){
    var voter = new Voter();
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
  var db = connect();
  return db.get(id+'');
};
