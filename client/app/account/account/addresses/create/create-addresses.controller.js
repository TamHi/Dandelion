'use strict';

angular.module('dandelionApp')
  .controller('CreateAddressesController', function($scope, Auth, $http, Address, $state) {

  	$scope.createAddress = function() {
  		console.log('Create');
	    $scope.submitted = true;

	    if ($scope.form.$valid) {
	    	console.log('valid');

	    	var name = $scope.address.name;
	    	var phone = $scope.address.phone;
	    	var city = $scope.address.city;
	    	var district = $scope.address.district;
	    	var ward = $scope.address.ward;
	    	var street = $scope.address.street;
	    	var isDefault = $scope.address.default;
	    	
	      Address.save({
	      	uid: Auth.getCurrentUser()._id,
	      	name: name,
	      	phone: phone,
	      	city: city,
	      	district: district,
	      	ward: ward,
	      	street: street,
	      	default: isDefault
	      })
	      	.$promise.then((res) => {
	      		console.log(res);
	      		$state.go('account.addresses');
	      	});
   		}
  	}

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
