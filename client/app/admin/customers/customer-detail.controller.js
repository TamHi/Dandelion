'use strict';

angular.module('dandelionApp.admin')
  .controller('AdminCustomersDetailCtrl', function($scope, User, Address, Order, $stateParams) {
    $scope.info = User.get({id: $stateParams.id});

    $scope.addresses = Address.user({id: $stateParams.id});

    $scope.orders = Order.user({id: $stateParams.id});

    $scope.delete = function(user) {
      user.$remove();
      $scope.users.splice($scope.users.indexOf(user), 1);
    }
  });