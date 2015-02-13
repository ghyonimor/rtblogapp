/**
 * Filters posts by tags, authors and dates. also activates the search bar.
 */
'use strict';

var app = angular.module('BlogApp');

app.filter('filterPosts', ['$location', '$filter','sanitizeService',
	function($location, $filter, sanitizeService) {

  return function(input) {
  	var output =[];
  	var temp = [];
  	var tags;
  	var author;
  	var date;
  	var pageData;
  	var key;
  	var value;
  	var sanitize = sanitizeService.getUrl;

  	/**
  	 * Get filter key and value.
  	 */
  	var location = $location.search();
  	for (var prop in location) {
  		if (location.hasOwnProperty(prop)) {
  			key = prop;
  			value = location[prop];
  		}
  	}

  	/**
  	 * If a filter is activated.
  	 */
  	if (value) {
	  	for (var i = 0; i < input.length; i++) {
	  		pageData = input[i];
	  		for (var obj in pageData) {
	  			if( pageData.hasOwnProperty( obj ) ) {
			    	var post = pageData[obj];
			    	tags = post.tags;
			    	author = post.author;
			    	date = post.date;
			    	/**
			    	 * If it's a category.
			    	 */
			    	if (key === 'category') {
				    	for (var j = 0; j < tags.length; j++) {
				    		if (sanitize(tags[j]) === value) {
				    			temp.push(post);
				    		}
				    	}
				    } else
				    /**
				     * If it's an author.
				     */
			    	if (key === 'author' && value === sanitizeService.getUrl(author)) {
			    		temp.push(post);
			    	} else
			    	/**
			    	 * If it's a date.
			    	 */
			    	if (key === 'date'){
				    	var month = $filter('date')(date, 'MMMM');
				    	var year = $filter('date')(date, 'yyyy');
				    	if (value === sanitize(month + year)) {
				    		temp.push(post);
				    	}
				    } else
				    /**
				     * If it's a search query.
				     */
				    if (key === 'search'){
				    	if (sanitize(post.title).indexOf(value) > -1 ||
				    		sanitize(post.author).indexOf(value) > -1 ||
				    		sanitize(post.description).indexOf(value) > -1) {
				    		temp.push(post);
				    	} else {
				    		for (var p = 0; p < tags.length; p++) {
					    		if (sanitize(tags[p]).indexOf(value) > -1) {
					    			temp.push(post);
					    		}
				    		}
				    	}
				    }
			 	}
	  		}
	  	}
	}
	/**
	 * There is no filter, get the original posts array.
	 */
	else {
		for (var a = 0; a < input.length; a++) {
	  		var page = input[a];
	  		for (var postD in page) {
	  			if( page.hasOwnProperty( postD ) ) {
			    	var postd = page[postD];
			    	temp.push(postd);
			    }
			}
		}
	}

	/**
	 * Sort temp array by date
	 */
	temp.sort(function(a,b) { return parseFloat(b.date) - parseFloat(a.date); } );

  	var len = temp.length;
  	/**
  	 * Number of pages.
  	 */
  	var pagesNum = Math.ceil(len / 3);
	for (var k = 1; k < pagesNum + 1; k++) {
		output[k] = [];
		for (var h = k * 3 - 3; h < k * 3; h++) {
			/**
			 * The output array contains array of the posts that will show on page output[i].
			 */
			if (temp[h]) {
				output[k].push(temp[h]);
			}
		}
	}
    return output;
  };
}]);
