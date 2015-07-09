'use strict';
var PouchDB = require('pouchdb');
var Family = require('./Family.js');

var Surnames = [
  'Santos',
  'Reyes',
  'Cruz',
  'Bautista',
  'Ocampo',
  'Garcia',
  'Mendoza',
  'Torres',
  'Tomas',
  'Andrada',
  'Castillo',
  'Flores',
  'Villanueva',
  'Ramos',
  'Castro',
  'Rivera',
  'Aquino',
  'Navarro',
  'Salazar',
  'Mercado',
  'de la Cruz',
  'de los Reyes',
  'del Rosario',
  'de los Santos',
  'de Guzman',
  'de Castro',
  'de la Rosa',
  'de Asis',
  'de Rosales'
];

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
    voter.name = 'Person '+i;
    voter.surname = Surnames[Math.floor((Math.random() * Surnames.length - 1))];
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
