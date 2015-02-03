'use strict';

var app = angular.module('BlogApp');

app.controller('PostsCtrl', ['$scope', '$filter', '$location', '$route','$routeParams',
	'postsService', 'activeService', 'sanitizeService',
	function($scope, $filter, $location, $route, $routeParams, postsService, activeService, sanitizeService) {

	var promise = postsService.getPosts;

	$scope.pages = [];

	promise.then(function(result) {
		$scope.data = result.data;
		var len = $scope.data.posts.length;

		if (len < 3) {
			console.log('do nothing');
		}

		if (len > 3) {
			var pagesNum = Math.ceil(len / 3);
			for (var i = 1; i < pagesNum + 1; i++) {
				$scope.pages[i] = [];
				for (var j = i* 3 - 3; j < i * 3; j++) {
					// The pages array contains array of the posts that will show on page pages[i].
					if ($scope.data.posts[j]) {
						$scope.pages[i].push($scope.data.posts[j]);
					}
				}
			}
		}

		$scope.pages = $filter('filterPosts')($scope.pages);

		if ($routeParams.param) {
			$scope.currentPage = Number($routeParams.param);
		} else {
			$scope.currentPage = 1;
			if (len > 3) {
				console.log('change route param');
			}
		}

		if (!$scope.pages[$scope.currentPage - 1]) {
			$('.next').css('display', 'none');
		}

		if ((!$scope.pages[$scope.currentPage + 1])) {
			$('.previous').css('display', 'none');
		}
	});

	$scope.sanitize = sanitizeService.getUrl;

	activeService.data = 0;

	$scope.currentFilter = $location.url().split('?')[1] ? '?' + $location.url().split('?')[1] : '';

	$scope.$watch(function(){ return $location.url().split('?')[1]; }, function(val, old){
		if ($location.url && (val !== old) && ($location.url().split('/')[1] === 'posts')) {
			$location.path('posts/1');
			console.log($location.url().split('/')[1]);
		}
	}, true);

	$scope.$on('$destroy', function(){
        activeService.data = null;
    });
}]);
