'use strict';

angular.module('dandelionApp')
  .controller('AddressesController', function($scope, Auth, Address) {
 
  	Address.query().$promise
  		.then((addresses) => {
  			$scope.addresses = addresses;
  			console.log(addresses);
  		})
  });
