'use strict';

angular.module('dandelionApp')
  .controller('CheckoutCtrl', function($scope, Auth, Checkout, $cookies) {
    Checkout.queryAddress()
      .then((res) => {
        $scope.addresses = res;
        if($cookies.get('chosenAddress')){
          $scope.chosenAddress = Checkout.getAddress($cookies.get('chosenAddress'));
        }
        else {
          console.log('No cookies');
          $scope.chosenAddress = Checkout.getDefaultAddress();
        }
      });
  });