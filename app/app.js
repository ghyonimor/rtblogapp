(function () {
	'use strict';

	var app = angular.module('BlogApp', ['ngRoute', 'angular-toArrayFilter']);

	app.config(['$routeProvider', function($routeProvider) {
	    $routeProvider.when('/', {
	        redirectTo: '/posts'})
	    .when('/posts/:param?', {
	        templateUrl: 'posts.html',
	        controller: 'PostsCtrl'})
	    .when('/post/:param?', {
	        templateUrl: 'post.html',
	        controller: 'PostCtrl'})
	    .when('/admin/:param?', {
	    	templateUrl: 'admin.html',
	    	controller: 'AdminCtrl'
	    });
	}]);

	app.controller('NavCtrl', ['$scope', 'navService', 'activeService',
		function($scope, navService, activeService) {

		var promise = navService.navElms;

		promise.then(function(result){
			$scope.data = result.data;
		});

		$scope.activate = function($index) {
			if ($index === activeService.data) {
				return 'active';
			}
			else {
				return '';
			}
		};
	}]);

	app.controller('PostsCtrl', ['$scope', 'postsService', 'activeService', 'sanitizeService',
		function($scope, postsService, activeService, sanitizeService) {

		var promise = postsService.getPosts;

		promise.then(function(result) {
			$scope.data = result.data;
		});

		$scope.sanitize = sanitizeService.getUrl;

		activeService.data = 0;

		$scope.$on('$destroy', function(){
	        activeService.data = null;
	    });
	}]);

	app.controller('PostCtrl', ['$scope', '$routeParams', 'postsService', 'sanitizeService',
		function($scope, $routeParams, postsService, sanitizeService) {

		var promise = postsService.getPosts;

		$scope.url = $routeParams.param;

		$scope.sanitize = sanitizeService.getUrl;

		promise.then(function(result) {
			$scope.data = result.data;
			for (var i = 0; i < $scope.data.posts.length; i++) {
				if  ($scope.url === $scope.sanitize($scope.data.posts[i].titles)) {
					$scope.single = $scope.data.posts[i];
				}
			}
		});
	}]);

	app.controller('AdminCtrl', ['$scope', 'activeService', function($scope, activeService) {
		activeService.data = 1;

		$scope.$on('$destroy', function(){
	        activeService.data = null;
	    });
	}]);

	app.factory('postsService', ['$http', function($http) {
		var getPosts = $http.get('data/posts.json');

		return {
			getPosts: getPosts
		};
	}]);

	app.factory('navService', ['$http', function($http) {
	    var navElms = $http.get('data/nav.json');

	    return {
	    	navElms: navElms
	    };
	}]);

	app.factory('activeService', function() {
		return {
			data: null
		};
	});

	app.factory('sanitizeService', function() {

		var getUrl = function(url){
			for (var i = 0; i < url.length; i++) {
				if (url[i] === ' ' || url[i] === '_') {
					url = url.substr(0, i) + url.substr(i + 1, url.length);
				}
			}
			return url;
		};

		return {
			getUrl: getUrl
		};
	});

	app.controller('FiltersCtrl', ['$scope', '$filter', 'postsService',
		function($scope, $filter, postsService){

		var promise = postsService.getPosts;

		promise.then(function(result) {
			$scope.data = result.data;
			/**
			 * "category": "num of posts"
			 */
			$scope.categories = {};
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
		});
	}]);
}());
