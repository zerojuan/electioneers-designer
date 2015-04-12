/*
#
# Bootstrap the app from here
#
*/
'use strict';

var model = require('./model');
var gui = require('nw.gui');
var win = gui.Window.get();

angular.element(document).ready(function(){
	//load or create settings files here
	model.init();

	angular.element(document).on('keyup', function(event){
		if ( event.which === 192 ) { //Tilde
	    event.preventDefault();
			win.showDevTools();
	  }else if(event.shiftKey && event.which === 67){ //F5
			win.reload();
		}
	});


	angular.bootstrap(document, ['paDesignerApp']);
});
