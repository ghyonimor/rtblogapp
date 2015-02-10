/**
 * Get posts data from json.
 */
'use strict';

var app = angular.module('BlogApp');

app.factory('postsService', ['$http', function($http) {
	var getPosts = $http.get('data/posts.json');

	return {
		getPosts: getPosts
	};
}]);
