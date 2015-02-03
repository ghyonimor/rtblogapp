'use strict';

var app = angular.module('BlogApp');

app.controller('SearchCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.check = function() {
		$location.path('posts');
		$location.search('Search=' + $scope.formCtrl.searchText);
	};
}]);
