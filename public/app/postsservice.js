/**
 * Get posts data from json.
 */
'use strict';

var socket = io();
console.log(socket);

var app = angular.module('BlogApp');

app.factory('postsService', ['$http', function($http) {
	var getPosts = $http.get('/posts');

	return {
		getPosts: getPosts
	};
}]);
