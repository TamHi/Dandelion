'use strict';

angular.module('dandelionApp')
  .controller('AddressesController', function($scope, Auth, Address, _) {
 
  	Address.query().$promise
  		.then((addresses) => {
  			$scope.addresses = addresses;
  			// console.log(addresses);
  		});

  	$scope.delete = function(id) {

  		Address.delete({ id: id }).$promise
  			.then((res) => {
          $scope.addresses = _.reject($scope.addresses, function(address){ 
            return address._id === id; 
          });
          // console.log(id);
          // console.log('Success');

          // $scope.addresses.slice()
        });
  	};
  });
