/**
 * Edit post controller..
 */
'use strict';

var app = angular.module('BlogApp');

app.controller('EditCtrl', ['$scope', 'activeService', 'saveService',
	function($scope, activeService, saveService) {
	activeService.data = 1;

	$scope.isEditMode = function() {
		return true;
	};

	$scope.save = saveService.save;

	$scope.del = function(){
		console.log('delete');
	};
}]);
