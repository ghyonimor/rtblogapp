'use strict';

var app = angular.module('BlogApp');

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
