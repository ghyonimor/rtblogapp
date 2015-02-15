/**
 * Filters posts by tags, authors and dates. also activates the search bar.
 */
'use strict';

var app = angular.module('BlogApp');

app.filter('filterPosts',['$location', '$filter','sanitizeService',
	function($location, $filter, sanitizeService) {

  return function(input, currentPage) {
  	var output = [];
  	var query = $location.url().split('?')[1] ? $location.url().split('?')[1] : '';
  	var key;
  	var value;
  	var sanitize = sanitizeService.getUrl;

  	if (!query) {
  		output = input;
  	} else {
  		key = query.split('=')[0];
  		value = query.split('=')[1];

	  	for (var i = 0; i < input.length; i++) {
	  		var post = input[i];
	  		var tags = post.tags;
	  		var author = sanitize(post.author);
	  		var date = post.date;
	  		var month = sanitize($filter('date')(date, 'MMMM'));
			var year = sanitize($filter('date')(date, 'yyyy'));
			var dateString = month + year;

	  		if (key === 'category'){
	  			for (var j = 0; j < tags.length; j++) {
	  				var tag = sanitize(tags[j]);
	  				if (tag === value) {
	  					output.push(post);
	  				}
	  			}
	  		} else if (key === 'author') {
	  			if (author === value) {
	  				output.push(post);
	  			}
	  		} else if (key === 'date') {
	  			if (dateString === value) {
	  				output.push(post);
	  			}
	  		} else if (key === 'search') {
	  			if (author.indexOf(value) > -1 ||
	  				dateString.indexOf(value) > -1 ||
	  				post.description.indexOf(value) > -1) {

	  				output.push(post);
	  			} else {
	  				for (var k = 0; k < tags.length; k++) {
		  				var tagSearch = sanitize(tags[k]);
		  				if (tagSearch.indexOf(value) > -1) {
		  					output.push(post);
		  				}
		  			}
	  			}
	  		}
	  	}
	}

	output = output.slice(currentPage * 3 - 3, currentPage * 3);

    return output;
  };
}]);
