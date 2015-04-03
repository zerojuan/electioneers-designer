/*
#
# Bootstrap the app from here
#
*/
'use strict';

var model = require('./model');

angular.element(document).ready(function(){
	//load or create settings files here
	console.log(model);
	model.init();


	angular.bootstrap(document, ['paDesignerApp']);
});
