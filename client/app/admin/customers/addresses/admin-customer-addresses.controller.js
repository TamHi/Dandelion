'use strict';

angular.module('dandelionApp.admin')
  .controller('AdminCustomerAddressesCtrl', function($scope, Address, $stateParams) {

  	$scope.loading = true;

    Address.user({id: $stateParams.id}).$promise
      .then(addresses => {
        $scope.addresses = addresses;
        $scope.loading = false;
      });

    $scope.predicate = 'name';
	  $scope.reverse = true;
	  $scope.order = function(predicate) {
	    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
	    $scope.predicate = predicate;
	  };

    // $scope.addresses = Address.user({id: $stateParams.id});
    		

  });