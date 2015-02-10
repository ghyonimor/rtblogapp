/**
 * This service will be updated and used as a flag for active navigation tabs.
 */
'use strict';

var app = angular.module('BlogApp');

app.factory('activeService', function() {
	return {
		data: null
	};
});
