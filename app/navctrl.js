'use strict';

var app = angular.module('BlogApp');

app.controller('NavCtrl', ['$scope', 'navService', 'activeService',
	function($scope, navService, activeService) {

	var promise = navService.navElms;

	promise.then(function(result){
		$scope.data = result.data;
	});

	$scope.activate = function($index) {
		if ($index === activeService.data) {
			return 'active';
		}
		else {
			return '';
		}
	};
}]);
