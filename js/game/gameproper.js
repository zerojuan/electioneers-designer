'use strict';

angular.module('paDesignerApp')
  .controller('GameProperCtrl', function(LoaderService, PopulationDB, ElectionEngine, $scope){
    console.log('Game Proper Has Been Loaded!');

    var currentCandidateIndex = 0;
    $scope.currentCandidate = null;
    $scope.day = 0;

    //--- $scope.gameData is inherited from global scope --//

    //TODO: SETTING UP CANDIDATE SHOULD BE DONE IN THE SETUP PHASE
    //select random candidates
    var candidates = [];
    $scope.gameData.candidates = candidates;

    for(var i = 0; i < 2; i++){
      var family = PopulationDB.getRandomFamily($scope.gameData.population);
      var candidate = {
        name: family.fatherName,
        lastName: family.familyName,
        family: family,
        councilors: [],
        selectedFamily: null,
        selectedDistrict: null
      };

      candidates.push(candidate);
    }

    //-----------------------------------------------------------

    var setCandidate = function(){
      $scope.currentCandidate = candidates[currentCandidateIndex];
    };

    setCandidate();

    $scope.onNextTurn = function(){
      //Check if everyone got their turn
      if(currentCandidateIndex+1 >= candidates.length){
        //a new day has dawned

        //apply changes to all voters
        ElectionEngine.UpdatePopulation($scope.gameData.population);

        $scope.day++;

        currentCandidateIndex = 0;
      }else{
        currentCandidateIndex += 1;
      }

      setCandidate();
    };
  });
