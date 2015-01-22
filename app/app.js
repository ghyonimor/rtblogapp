(function () {
	'use strict';

	var app = angular.module('BlogApp', ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider) {
	    $routeProvider.when('/', {
	        redirectTo: '/posts'})
	    .when('/posts/:param?', {
	        templateUrl: 'posts.html',
	        controller: 'PostsCtrl'})
	    .when('/post/:param?', {
	        templateUrl: 'post.html',
	        controller: 'PostCtrl'});
	}]);

	app.controller('PostsCtrl', ['$scope', 'myService', function($scope, myService) {
		myService.async().then(function() {
			$scope.data = myService.data();
		});
	}]);

	app.controller('PostCtrl', ['$scope', function($scope) {
	}]);

	app.controller('NavCtrl', ['$scope', '$location', function($scope, $location) {
		$scope.$on('$locationChangeSuccess', function(){
		  $scope.active = $location.$$url;
		});
		$scope.activate = function(url) {
			if (($scope.active.indexOf(url) === 0) &&
				($scope.active.indexOf('?filter=') === -1) &&
				($scope.active.indexOf('&filter=') === -1)) {
				return 'active';
			}
			else {
				return '';
			}
		};
	}]);

	app.factory('myService', ['$http', '$q', function($http, $q) {
	    var deffered = $q.defer();
	    var data = [];
	    var myService = {};

	    myService.async = function() {
	        $http.get('/data/posts.json')
	        .success(function (d) {
	            data = d;
	            console.log(d);
	      		deffered.resolve();
	    	});
	    	return deffered.promise;
	  	};
	  	myService.data = function() { return data; };

	  	return myService;
	}]);
}());
