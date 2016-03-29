angular.module('dandelionApp')
	.controller('SidebarCtrl', function($rootScope, $scope, Catalog, $location) {
		// Temporary using hard code catalog
		$scope.showCat = function(catSlug) { 
			$rootScope.$broadcast('catalog-search', catSlug);
		};
	})