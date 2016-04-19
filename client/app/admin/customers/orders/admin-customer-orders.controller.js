'use strict';

angular.module('dandelionApp.admin')
  .controller('AdminCustomerOrdersCtrl', function($scope, Order, $stateParams, $uibModal, _, Modal) {

    $scope.loading = true;

    console.log($stateParams.id);

    Order.user({id: $stateParams.id}).$promise
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

	  $scope.complete = Modal.confirm.completeOrder((order) => {
      console.log(order);
      order.shippingStatus = true;
      order.paymentStatus = true;
      Order.update({id: order._id}, order);
    });
    $scope.delete = Modal.confirm.delete((order) => {
      console.log(order);
      Order.delete({id: order._id}).$promise
        .then(() => {
          $scope.orders.splice($scope.orders.indexOf(order), 1);
        })
    }); 

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