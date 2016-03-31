angular.module('dandelionApp')
	.factory('Address', function($resource) {
		return $resource('/api/addresses/:id', {
			id: '@_id'
		});
	})