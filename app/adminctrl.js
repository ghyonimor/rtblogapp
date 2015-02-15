/**
 * A controller to be used in the admin panel.
 */
'use strict';

var app = angular.module('BlogApp');

app.controller('AdminCtrl', ['$scope', 'activeService', 'postsService',
	function($scope, activeService, postsService) {

	activeService.data = 1;

	var promise = postsService.getPosts;

	/**
	 * Get posts data.
	 */
	promise.then(function(result) {
		$scope.data = result.data;
	});

	$scope.$on('$destroy', function(){
        activeService.data = null;
    });
}]);
