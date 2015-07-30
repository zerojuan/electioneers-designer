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

    function pickValidFamily(population){
      var family;
      do{
        //pick a family that has adults
        //prevent incest?
        family = pickRandom(population);
        console.log('Family: ', family);
      }while(family.voters < 2);

      return family;
    }

    function pickRandomDistrict(districts){
      return pickRandom(districts);
    }

    function Family(familyName, income){
      this._id = guid();
      this.familyName = familyName;
      this.income = income;
      this.age = 0;
      this.kids = 0;
      this.voters = 2;
      this.generation = 0;
      this.district = null;
      this.parent = {
        father: null,
        mother: null
      };
      this.children = {
        males: [],
        females: [],
        total: 0
      };
      this.fatherName = pickRandom(MaleNames);
    }

    function introduceFamilies(population, districts){
      //Pick 5 surnames
      var immigrationCeiling = Math.floor(Math.random() * 5);
      for(var i =0 ; i < immigrationCeiling; i++){
        var familyName = pickRandom(Surnames);
        var family = new Family(familyName, Math.floor(Math.random() * 100 + 100));
        //pick random district
        family.district = pickRandomDistrict(districts);
        population.push(family);
      }
    }

    function incrementAge(population, districts){
      _.forEach(population, function(family){
        //increase age
        family.age += 5;
        //change wealth
        family.income += Math.floor(Math.random() * 20 - 10);
        //if age > 45
        if(family.age > 20 && family.kids > 0){
          //one less kids
          family.kids--;
          family.voters++;
          family.children.total++;
        }
      });
    }

    function deaths(population, districts){
      //mark a family member as deceased
      //divide wealth equally to children
    }

    function intermarry(population, districts){
      //TODO: Marry against a new immigrant? 1 local + 1 immigrant? Males get no kinship on mother side, Females get no kinship on father side
      var marriageCeiling = Math.floor(Math.random() * 20);
      for(var i = 0; i < marriageCeiling; i++){
        //pick a random population
        var fathers = pickRandom(population);
        var mothers = pickRandom(population);

        if(!fathers && !mothers){
          console.log('No marriage');
          continue;
        }

        if(fathers.voters <= 2 || mothers.voters <= 2){
          //possible adultery?
          continue;
        }

        if(fathers._id === mothers._id){
          continue;
        }

        //generate a new family
        var family = new Family(fathers.familyName, Math.floor(Math.random() * 100 + 100));
        family.parent.father = fathers._id;
        family.parent.mother = mothers._id;
        family.district = pickRandomDistrict(districts);
        //TODO: select random location based on parents and income
        //TODO: Append middle name?
        family.generation = fathers.generation + 1;
        //remove family member from both families
        mothers.voters--;
        mothers.children.females.push(family._id);
        fathers.voters--;
        fathers.children.males.push(family._id);
        population.push(family);
      }
    }

    function childBirth(population, districts){
      //add kids based on age and income level
      _.forEach(population, function(family){
        if(family.age > 5 && family.age < 30){
          family.kids++;
        }
      });
    }

    function mutateBeliefs(population){

    }

    this.updatePopulation = function(population, districts){
      //introduce families to the pool
      introduceFamilies(population, districts);
      //age families (1 generation is 5 years)
      incrementAge(population, districts);
      //create new families from existing ones
      intermarry(population, districts);
      //kill off family members (old, random sickness)
      deaths(population, districts);
      //add kids to of-age families (based on income and age)
      childBirth(population, districts);
    };

  });
