'use strict';

angular.module('dandelionApp')
  .controller('CheckoutCtrl', function($scope, Auth, Checkout) {
    Checkout.queryAddress()
      .then((res) => {
        $scope.addresses = res;
        $scope.chosenAddress = Checkout.getDefaultAddress();
      });
    
    $scope.$on('choose-address', function() {
      $scope.chosenAddress = Checkout.getAddress();
    });
  });