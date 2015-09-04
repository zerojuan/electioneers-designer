'use strict';

angular.module('paDesignerApp')
  .controller('GameProperCtrl', function(LoaderService, $scope){
    console.log('Loaded here...');
    $scope.test = 'This is a test';
    $scope.voter = {
      name: 'Idiot'
    };
    //console.log('You have access to game data people!')
    var p = LoaderService.GetVoter();
    p.then(function(data){
      console.log('Load Voter...', data);
      $scope.test = 'another test';
      $scope.voter = data;
      var voters = LoaderService.GetFamilies('db2');
      voters.then(function(data){
        console.log('Returned data: ', data.rows[0]);
        //load
        $scope.voters = data.rows;
        $scope.$apply();
      }).catch(function(err){
        console.log('Error: ', err);
      });
      $scope.$apply();
    }).catch(function(err){
      console.log('Error: ', err);
    });


  });
