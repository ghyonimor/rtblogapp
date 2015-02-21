/**
 * This directive will parse markdown.
 */
'use strict';

var app = angular.module('BlogApp');

app.directive('markdown', function() {
  return {
    restrict: 'E',
    link: function(scope, element) {
    	scope.$watch(function() {
    		return scope.markdown;
    	}, function(){
    		var sanitized = '';
    		if (scope.markdown) {
    			sanitized = scope.markdown;

    		}

    		element.html(sanitized);
    	});
    }
  };
});
