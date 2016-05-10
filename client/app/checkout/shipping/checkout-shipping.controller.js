'use strict';

angular.module('dandelionApp')
  .controller('CheckoutShippingCtrl', function($scope, Checkout, $state, $cookies) {

  	$scope.chooseAddress = function(addr) {
  		$cookies.put('chosenAddress', addr._id);
  		$scope.$parent.chosenAddress = Checkout.getAddress($cookies.get('chosenAddress'));
  		$state.go('checkout.payment');
  	}
  });
