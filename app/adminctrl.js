/**
 * A controller to be used in the admin panel.
 */
'use strict';

var app = angular.module('BlogApp');

app.controller('AdminCtrl', ['$scope', '$location', 'sanitizeService', 'activeService', 'postsService',
	function($scope, $location, sanitizeService, activeService, postsService) {

	activeService.data = 1;

	var promise = postsService.getPosts;

	$scope.sanitize = sanitizeService.getUrl;

	/**
	 * Get posts data.
	 */
	promise.then(function(result) {
		$scope.data = result.data;
	});

	$scope.$on('$destroy', function(){
        activeService.data = null;
    });

    $scope.check = function(post) {
    	var url = $scope.sanitize(post.title);
    	console.log($location.url());
    	console.log(url);
    	$location.url('admin/edit/post/' + url);
    };

    $scope.predicate = 'title';
    $scope.reverse = false;
}]);
