'use strict';

angular.module('dandelionApp')
  .controller('EditAddressesController', function($scope, Auth, $http, $state, userAddress, $timeout) {

  	userAddress.$promise
  		.then((address) => {
  			$scope.address = {
  				name: address.name,
  				phone: address.phone,
  				city: address.city,
  				district: address.district,
  				ward: address.ward,
  				street: address.street,
  				default: address.default,
  			};

  			$timeout(function() {
  				$('#msg').text("Shit");
  				$('#city select').val('cần thơ');
  			}, 0);
  		});

  	$http.get('/api/addresses/city')
    	.then((res) => {
    		$scope.cities = res.data.LtsItem;
    		console.log($scope.cities);
    	});  	

   	$scope.$watch('address.city', function(newVal) {
   		console.log('changed');
    	if(typeof newVal !== 'undefined') {
    		$http.get('/api/addresses/city/'+newVal+'/district')
	    		.then((res) => {
	    			$scope.districts = res.data;
	    			console.log(res.data);
	    		});
    	}
    });

    $scope.$watch('address.district', function(newVal) {
    	if(typeof newVal !== 'undefined') {
    		$http.get('/api/addresses/district/'+newVal+'/ward')
	    		.then((res) => {
	    			$scope.wards = res.data;
	    			console.log(res.data);
	    		});
    	}
    });
  });
