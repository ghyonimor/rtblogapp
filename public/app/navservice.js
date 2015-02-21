/**
 * Gets navigation elements from json.
 */
'use strict';

var app = angular.module('BlogApp');

app.factory('navService', ['$http', function($http) {
    var navElms = $http.get('data/nav.json');

    return {
    	navElms: navElms
    };
}]);
