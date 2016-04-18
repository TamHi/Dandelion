angular.module('dandelionApp.admin')
	.controller('OrderItemsCtrl', function ($scope, $uibModalInstance, items) {

    $scope.items = items;

    $scope.ok = function () {
      $uibModalInstance.close();
    };
  });