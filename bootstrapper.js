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

	angular.element(document).on('keydown', function(event){
		console.log('Key pressed: ', event.which);
		console.log('Control Key pressed: ', event.metaKey);
		if ( event.which === 192 ) { //Tilde
	    event.preventDefault();
			win.showDevTools();
	  }else if(event.which === 67 && event.metaKey){ //C
			win.reload();
		}else if(event.which === 9){ //Tab
			console.log('Toggling fullscreen?');
			win.toggleFullscreen();
		}
	});

	angular.bootstrap(document, ['paDesignerApp']);
});
