'use strict';

angular.module('paDesignerApp')
  .service('ActionsModel', function(){
    var Action = function(atts){
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
      CreateAction: function(actions){
        return new Action({
          name: 'New Action',
          id: ''+Date.now()
        });
      },
      Action: Action
    };
  });
