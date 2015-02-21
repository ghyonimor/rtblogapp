/**
 * This service will save a new post data in localStorage.
 */
'use strict';

var app = angular.module('BlogApp');

app.factory('saveService', ['$http', function($http) {
	return {
		save: function(title, author, tags, description, markdown) {
			var tagArray = tags.replace(' ', '').split(',');

			var post = {
				'title': title,
				'author': author,
				'tags': tagArray,
				'description': description,
				'mdPath': markdown
			};

			$http.post('/posts', {
				post: post
			});
		},
		del: function() {
			console.log('delete');
		}
	};
}]);
