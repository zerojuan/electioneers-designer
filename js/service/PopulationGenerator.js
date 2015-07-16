'use strict';

angular.module('paDesignerApp')
  .service('PopulationGenerator', function(){
    var gameData;

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

    var MaleNames = [
      'Adam',
      'Albert',
      'Andrew',
      'Bart',
      'Bert',
      'Bogart',
      'Carlos',
      'Carl',
      'Carey',
      'Duke',
      'Duckey',
      'David',
      'Dick',
      'Filipe',
      'Ilia'
    ];

    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    function pickRandom(arr){
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function Family(familyName, income){
      this._id = guid();
      this.familyName = familyName;
      this.income = income;
      this.age = 25;
      this.kids = 0;
      this.parent = {
        father: null,
        mother: null
      };
      this.fatherName = pickRandom(MaleNames);
    }

    function introduceFamilies(population){
      //Pick 5 surnames
      for(var i =0 ; i < Math.floor(Math.random()*5); i++){
        var familyName = pickRandom(Surnames);
        population.push(new Family(familyName, Math.floor(Math.random() * 100 + 100)));
      }
    }

    function incrementAge(population){
      _.forEach(population, function(family){
        //increase age
        family.age += 5;
        //change wealth
        family.income += Math.floor(Math.random() * 20 - 10);
      });
    }

    function deaths(population){
      //mark a family member as deceased
      //divide wealth equally to children
    }

    function intermarry(population){
      //generate a new family
      //remove family member from both families
    }

    function childBirth(population){
      //add kids based on age and income level
      _.forEach(population, function(family){
        if(family.age > 30 && family.age < 50){
          family.kids++;
        }
      });
    }

    function mutateBeliefs(population){

    }

    this.updatePopulation = function(population){
      //introduce families to the pool
      introduceFamilies(population);
      //age families (1 generation is 5 years)
      incrementAge(population);
      //create new families from existing ones
      intermarry(population);
      //kill off family members (old, random sickness)
      deaths(population);
      //add kids to of-age families (based on income and age)
      childBirth(population);
    };

  });
