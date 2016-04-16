angular.module('dandelionApp')
	.factory('Order', function($resource) {
		return $resource('/api/orders/:action/:id', {
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