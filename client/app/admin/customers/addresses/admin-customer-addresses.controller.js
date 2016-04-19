'use strict';

angular.module('dandelionApp.admin')
  .controller('AdminCustomerAddressesCtrl', function($scope, Address, $stateParams) {

  	$scope.loading = true;

    Address.user({id: $stateParams.id}).$promise
      .then(addresses => {
        console.log(addresses);
        $scope.addresses = addresses;
        $scope.loading = false;
      });
  });