'use strict';

angular.module('paDesignerApp')
  .controller('GameProperCtrl', function(LoaderService, $scope){
    console.log('Loaded here...');
    $scope.test = 'This is a test';
    $scope.voter = {
      name: 'Idiot'
    };
    LoaderService.GetVoter().then(function(data){
      console.log('Returned data: ', data);
      $scope.test = 'another test';
      $scope.voter = data;
      $scope.$apply();
    }).catch(function(err){
      console.log('Error: ', err);
    });
  });
