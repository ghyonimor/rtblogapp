/**
 * Get the filters from the json file, count the number of posts each filter shows and display it.
 */
'use strict';

var app = angular.module('BlogApp');

app.controller('FiltersCtrl', ['$scope', '$location', '$filter', '$route', 'postsService', 'sanitizeService',
	'activeService',
	function($scope, $location, $filter, $route, postsService, sanitizeService, activeService){

	var promise = postsService.getPosts;

	promise.then(function(result) {
		$scope.data = result.data;
		/**
		 * "category": "num of posts"
		 */
		$scope.categories = {};

		if (activeService.data === 1 || $scope.route === null){
			$scope.route = 'admin';
		} else if (activeService.data === 0){
			$scope.route = 'posts';
		}

		/**
		 * "author": "num of posts"
		 */
		$scope.authors = {};
		/**
		 * "Year": {"Month": "numPosts"}
		 *
		 * "2015": {"Augost": "3", "November": "2"},
		 * "2014": {"January": "1", "February": "2"}
		 */
		$scope.years = {};

		$scope.numPosts = $scope.data.posts.length;

		$scope.keyUp = function(elm) {
			return Object.keys(elm);
		};

		$scope.sanitize = sanitizeService.getUrl;

		$scope.$on('$routeChangeSuccess', function() {
			var param = $route.current.params.param;

			var ctrl = $route.current.$$route.controller;

			if (param && (ctrl === 'PostsCtrl')) {
				$scope.param = '/' + param;
			}
			else {
				$scope.param = '';
			}
		});

		/**
		 * Counts and displays filters.
		 */
		for (var i = 0; i < $scope.data.posts.length; i++) {
			var post = $scope.data.posts[i],
				author = post.author,
				date = post.date,
				year = $filter('date')(date, 'yyyy'),
				month = $filter('date')(date, 'MMMM');

			for (var j = 0; j < post.tags.length; j++) {
				var tag = post.tags[j];

				if ($scope.categories[tag]) {
					$scope.categories[tag] = $scope.categories[tag] + 1;
				}
				else {
					$scope.categories[tag] = 1;
				}
			}

			if ($scope.authors[author]) {
				$scope.authors[author] = $scope.authors[author] + 1;
			}
			else {
				$scope.authors[author] = 1;
			}

			if ($scope.years[year]) {
				if ($scope.years[year][month]) {
					$scope.years[year][month] = $scope.years[year][month] + 1;
				}
				else {
					$scope.years[year][month] = 1;
				}
			}
			else {
				$scope.years[year] = {};
				$scope.years[year][month] = 1;
			}
		}

		/**
		 * return 'active' class if the filter is active.
		 */
		$scope.isActive = function(key){
			var query = $location.url().split('?')[1] ? $location.url().split('?')[1] : undefined;
			if ($location.path().indexOf('/post/') === -1 && query === key) {
				return 'active';
			}
		};
	});
}]);
