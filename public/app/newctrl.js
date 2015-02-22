/**
 * Create new post controller..
 */
'use strict';

var app = angular.module('BlogApp');

app.controller('NewCtrl', ['$scope', 'activeService', 'saveService',
	function($scope, activeService, saveService) {
	activeService.data = 1;

	$scope.isEditMode = function() {
		return false;
	};

	$scope.save = saveService.save;

	$scope.type = 'new';

	$scope.index = null;
}]);
