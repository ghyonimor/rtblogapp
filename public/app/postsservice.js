/**
 * Get posts data from json.
 */
'use strict';

var app = angular.module('BlogApp');

app.factory('postsService', ['$http', function($http) {
	var getPosts = $http.get('/posts');

	return {
		getPosts: getPosts
	};
}]);
