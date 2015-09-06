'use strict';

angular.module('paDesignerApp')
  .controller('GameProperCtrl', function(LoaderService, $scope){
    console.log('Loaded here...');
    $scope.test = 'This is a test';
    $scope.voter = {
      name: 'Idiot'
    };
    //console.log('You have access to game data people!')
    

  });
