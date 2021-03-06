/**
 * Edit post controller..
 */
'use strict';

var app = angular.module('BlogApp');

app.controller('EditCtrl', ['$scope', '$http', '$routeParams',
	'postsService', 'sanitizeService', 'activeService', 'saveService',
	function($scope, $http, $routeParams, postsService, sanitizeService, activeService, saveService) {

	var param = $routeParams.param;
	var sanitize = sanitizeService.getUrl;
	var promise = postsService.getPosts;

	$scope.type = 'edit';
	$scope.isEditMode = function() {
		return true;
	};
	$scope.save = saveService.save;
	$scope.del = saveService.del;

	activeService.data = 1;

	promise.then(function(result) {
		$scope.data = result.data;
		$scope.posts = $scope.data.posts;

		for (var i = 0; i < $scope.posts.length; i++) {
			var post = $scope.posts[i];
			if (sanitize(post.title) === param) {
				$scope.index = i;
				$scope.title = post.title;
				$scope.author = post.author;
				$scope.tags = post.tags;
				$scope.description = post.description;
				$http.get(post.mdPath).success(function(data) {
					$scope.markdown = data;
				});
			}
		}
	});
}]);
