'use strict';

angular.module('paDesignerApp')
  .service('KapitansModel', function(){
    var Kapitan = function(atts){
      var self = this;

      self.selected = false;

      var initialSettings = atts || {};
       //initial settings if passed in
      for(var setting in initialSettings){
        if(initialSettings.hasOwnProperty(setting)){
          self[setting] = initialSettings[setting];
        }
      }

      return self;
    };

    return {
      CreateKapitan: function(){
        return new Kapitan({
          name: 'New Kapitan',
          id: ''+Date.now()
        });
      },
      Kapitan: Kapitan
    };
  });
