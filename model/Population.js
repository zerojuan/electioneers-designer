'use strict';
var PouchDB = require('pouchdb');
var Family = require('./Family.js');
var Dictionary = require('./Dictionary.js');

var Surnames = Dictionary.Surnames;
var MaleNames = Dictionary.MaleNames;
console.log('Male:',MaleNames);

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
    console.log(err, err.stack);
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
  var db = connect('db2', function(){
    var population = [];
    var i = 0;
    var size = 1000;
    for(i = 0; i < size; i++){
      var voter = new Family();
      voter.name = MaleNames[Math.floor((Math.random()*MaleNames.length -1))];
      voter.surname = Surnames[Math.floor((Math.random() * Surnames.length - 1))];
      voter.gender = 'M';
      voter._id = i+'';
      population.push(voter);
    }
    console.log('heeeere');

    for(i = 0; i < size; i++){
      //maybe do an async here
      console.log('here');
      db.put(population[i])
        .then(function(){

        })
        .catch(function(err){

          if(err.message === 'Document update conflict'){
            return;
          }
        });
    }
    done();
  });

};

exports.getPerson = function(id){
  var db = connect('db2');
  var person = db.get(id+'');
  person.then(function(){
    db.close(); //always close the db once done
  });
  return person;
};

exports.getFamilies = function(dbName, start){
  var db = connect(dbName);
  var person = db.allDocs({
    include_docs: true,
    limit: 50
  });
  person.then(function(){
    db.close();
  });
  return person;
};
