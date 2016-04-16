angular.module('dandelionApp')
	.factory('Address', function($resource) {
		return $resource('/api/addresses/:action/:id', {
			id: '@_id'
		}, {
			'update': {method: 'PUT'},
			'user': {
				method: 'GET',
				params: {
					action: 'user'
				},
				isArray: true
			}
		});
	})