angular.module('dandelionApp.admin')
	.directive('orderItems', function() {
		return {
			restrict: 'E',
			templateUrl: 'app/admin/order-items/order-items.html'
		}
	})