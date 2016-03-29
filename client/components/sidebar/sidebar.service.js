angular.module('dandelionApp')
	.factory('Catalog', function($resource) {
		return $resource('api/catalogs/:id');
	})