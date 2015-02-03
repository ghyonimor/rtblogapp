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
}());
