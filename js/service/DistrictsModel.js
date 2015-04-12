'use strict';

angular.module('paDesignerApp')
  .service('DistrictsModel', function(){
    var District = function(atts){
      var self = this;

      self.selected = false;

      var initialSettings = atts || {};
       //initial settings if passed in
      for(var setting in initialSettings){
        if(initialSettings.hasOwnProperty(setting)){
          self[setting] = initialSettings[setting];
        }
      }

      self.addNeighbor = function(n){
        self.neighbors.push({
          id: n.id,
          name: n.name
        });
      };
      self.removeNeighbor = function(n){
        self.neighbors = _.reject(self.neighbors, function(dn){
          return dn.id === n.id;
        });
      };

      self.setKap = function(kaps){
        console.log('What is my kapitan id: ', self.kapitanId);
        var kap = _.find(kaps, function(k){
          return k.id === self.kapitanId;
        });
        console.log('Found Kap: ', kap);
        self.kap = kap;
      };

      return self;
    };

    return {
      CreateDistrict: function(kapitans){
        return new District({
          name: 'New District',
          id: ''+Date.now(),
          population: 10,
          kapitanId: kapitans[0].id,
          kap: kapitans[0],
          neighbors: []
        });
      },
      District: District
    };
  });
