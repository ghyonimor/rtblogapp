/**
 * This directive will parse markdown.
 */
'use strict';

var app = angular.module('BlogApp');

app.directive('markdown', ['$window', function($window) {
  return {
    restrict: 'E',
    link: function(scope, element) {
    	scope.$watch(function() {
    		return scope.markdown;
    	}, function(){
    		var sanitized = '';
    		if (scope.markdown) {
    			sanitized = $window.marked(scope.markdown);
    		}

    		element.html(sanitized);
    	});
    }
  };
}]);
