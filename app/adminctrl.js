/**
 * A controller to be used in the admin panel.
 */
'use strict';

var app = angular.module('BlogApp');

app.controller('AdminCtrl', ['$scope', 'activeService', function($scope, activeService) {
	activeService.data = 1;

	$scope.$on('$destroy', function(){
        activeService.data = null;
    });
}]);
