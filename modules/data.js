'use strict';

/**
 * Load modules
 */

var fs = require('fs');

/**
 * Create a data file to store posts data
 * Only if it doesn't exist
 */

var postsPath = 'data/posts.json';

fs.readFile(postsPath, function (err, data) {
	var posts;

	// File doesn't exist
	if (err) {
		posts = {
			'posts': []
		};

		// Create the file (data must be a string)
		fs.writeFile(postsPath, JSON.stringify(posts), function (err) {
			if (err) {
				console.log(err);
			}

			console.log('Write file successful: posts.json');
		});
	}

	// File already exist, do nothing
});

module.exports = postsPath;
