'use strict';

angular.module('dandelionApp.admin')
  .controller('OrdersController', function($scope, Order, Auth, $uibModal, _, Modal) {

    $scope.loading = true;

    console.log(Auth.getCurrentUser()._id);

    Order.user({id: Auth.getCurrentUser()._id}).$promise
      .then(orders => {
        $scope.orders = orders;
        $scope.loading = false;
      });

    $scope.predicate = 'createAt';
	  $scope.reverse = true;
	  $scope.order = function(predicate) {
	    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
	    $scope.predicate = predicate;
	  };

	  $scope.openModal = (orderId) => {

	  	var modalInstance = $uibModal.open({
	      templateUrl: 'OrderItems.html',
	      controller: 'OrderItemsCtrl',
	      size: 'lg',
	      resolve: {
	        items: function () {
		      	var order = _.find($scope.orders, order => {
		      		return order._id === orderId;
		      	});
	          return order.items;
	        }
	      }
	    });
	  }

  })