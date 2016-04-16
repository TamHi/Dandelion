'use strict';

angular.module('dandelionApp')
  .controller('CheckoutShippingCtrl', function($rootScope, $scope, Auth, Checkout, $state) {

  	$scope.chooseAddress = function(id) {
  		$state.go('checkout.payment').then(() => {
  			Checkout.setAddress(id);
	  		$rootScope.$broadcast('choose-address');
  		});
  	}
  });
