/**
 * The main js file, defines routes.
 */
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
	    .when('/admin', {
	    	templateUrl: 'admin.html',
	    	controller: 'AdminCtrl'
	    })
	    .when('/admin/new/post', {
	    	templateUrl: 'new.html',
	    	controller: 'NewCtrl'
	    })
	    .when('/admin/edit/post/:param', {
	    	templateUrl: 'new.html',
	    	controller: 'EditCtrl'
	    });
	}]);
}());
