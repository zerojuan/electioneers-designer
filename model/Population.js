'use strict';
var PouchDB = require('pouchdb');


function connect(){
  var db = new PouchDB(__dirname+'/db', { db: require('level-js') });
  return db;
}

exports.generatePopulation = function(){
  var db = connect();
  var population = [];
  var i = 0;
  var size = 10000;
  for(i = 0; i < size; i++){
    var person = {
      name: i+'abcdefghijklmnop'+i,
      _id: i+'',
      affiliation: 'Democrat',
      likes: ['golf', 'code', 'apples']
    };
    population.push(person);
  }

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
  var db = connect();
  return db.get(id+'');
};
