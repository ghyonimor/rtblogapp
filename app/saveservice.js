/**
 * This service will save a new post data in localStorage.
 */
'use strict';

var app = angular.module('BlogApp');

app.factory('saveService', function() {
	return {
		// Save post data to local storage 'postsCache'.
		save: function(title, author, tags, description, markdown) {
			var tagArray = tags.replace(' ', '').split(',');

			var post = {
				'title': title,
				'author': author,
				'tags': tagArray,
				'description': description,
				'mdPath': markdown
			};

			var posts = [];

			if (JSON.parse(localStorage.getItem('postsCache'))) {
				posts = JSON.parse(localStorage.getItem('postsCache'));
			}

			posts.push(post);

			localStorage.setItem('postsCache', JSON.stringify(posts));
		}
	};
});
