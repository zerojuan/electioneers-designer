'use strict';
var PouchDB = require('pouchdb');

var db = new PouchDB(__dirname+'/db', { db: require('level-js') });
db.info().then(function (result) {
  console.log(result);
}).catch(function (err) {
  console.error(err);
});
exports.generatePopulation = function(){
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
  return db.get(id+'');
};
