/**
 * Search element controller, activates search in the URL.
 */
'use strict';

var app = angular.module('BlogApp');

app.controller('SearchCtrl', ['$scope', '$location', 'sanitizeService', 'activeService',
	function($scope, $location, sanitizeService, activeService) {

	$scope.sanitize = sanitizeService.getUrl;

	$scope.check = function() {
		if (activeService.data === 0 || activeService.data === null){
			$location.path('posts');
		} else if (activeService.data === 1) {
			$location.path('admin');
		}
		$location.search('search=' + $scope.sanitize($scope.formCtrl.searchText));
	};
}]);
