'use strict';

var app = angular.module('BlogApp');

app.factory('sanitizeService', function() {

	var getUrl = function(url){
		url = url.replace(/[$+,:;=@#|'"<>.^*()%!/\s]/g, '');

		return url;
	};

	return {
		getUrl: getUrl
	};
});
