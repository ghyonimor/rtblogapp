/**
 * This service will save a new post data in localStorage.
 */
'use strict';

var app = angular.module('BlogApp');

app.factory('saveService', ['$http', function($http) {
	return {
		save: function(type, index, title, author, tags, description, markdown) {

			var tagArray;

			if (tags.constructor === Array) {
				tagArray = tags;
			} else {
				if (tags.indexOf(',') > -1) {
					tagArray = tags.replace(' ', '').split(',');
				} else {
					tagArray = [tags];
				}
			}

			var post = {
				title: title,
				author: author,
				tags: tagArray,
				description: description,
				mdPath: markdown
			};

			$http.post('/posts', {
				post: post,
				type: type,
				index: index
			});
		},
		del: function(index) {
			$http.post('/posts', {
				index: index,
				type: 'delete'
			});
		}
	};
}]);
