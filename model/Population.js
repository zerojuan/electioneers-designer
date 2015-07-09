'use strict';
var PouchDB = require('pouchdb');
var Family = require('./Family.js');


function connect(dbName, callback){
  console.log('Trying to connect...', dbName);
  var db = new PouchDB(dbName, { db: require('level-js') });
  db.info().then(function(result){
    console.log('Connect success');
    if(callback){
      callback(result);
    }
  })
  .catch(function(err){
    console.log('Error connecting...');
    console.log(err);
  });
  return db;
}
//TODO: Generate generations based on families

exports.hasPopulation = function(dbName, done){
  connect(dbName, function(result){
    console.log('info:',result);
    done(result);
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

  for(i = 0; i < size; i++){
    //maybe do an async here
    db.put(population[i])
      .then(function(){

      })
      .catch(function(err){

        if(err.message === 'Document update conflict'){
          return;
        }
      });
  }
};

exports.getPerson = function(id){
  var db = connect('db2');
  var person = db.get(id+'');
  person.then(function(){
    db.close(); //always close the db once done
  });
  return person;
};
