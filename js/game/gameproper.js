'use strict';

angular.module('paDesignerApp')
  .controller('GameProperCtrl', function(LoaderService, $scope){
    console.log('Loaded here...');
    LoaderService.GetVoter().then(function(data){
      console.log('Returned data: ', data);
    });
  });
