/**
 * Search element controller, activates search in the URL.
 */
'use strict';

var app = angular.module('BlogApp');

app.controller('SearchCtrl', ['$scope', '$location', 'sanitizeService',
	function($scope, $location, sanitizeService) {

	$scope.sanitize = sanitizeService.getUrl;

	$scope.check = function() {
		$location.path('posts');
		$location.search('search=' + $scope.sanitize($scope.formCtrl.searchText));
	};
}]);
