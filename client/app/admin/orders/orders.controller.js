'use strict';

angular.module('dandelionApp.admin')
  .controller('AdminOrdersCtrl', function($scope, User, Order, $uibModal, Modal) {
    
    /**
     * Loading
     */
    $scope.loading = true;

    Order.query().$promise
      .then(orders => {
        $scope.orders = orders;
        $scope.loading = false;
      });

    /**
     * OrderBy
     */
    $scope.predicate = 'createAt';
	  $scope.reverse = true;
	  $scope.order = function(predicate) {
	    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
	    $scope.predicate = predicate;
	  };

    /**
     * Complete / Delete Order
     */
    $scope.delete = Modal.confirm.delete((order) => {
      console.log(order);
      Order.delete({id: order._id}).$promise
        .then(() => {
          $scope.orders.splice($scope.orders.indexOf(order), 1);
        })
    }) 

    /**
     * Order Items modal
     */
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
  });