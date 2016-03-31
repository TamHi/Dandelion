'use strict';

angular.module('dandelionApp')
  .controller('CreateAddressesController', function($scope, Auth, $http, Address) {

  	$scope.createAddress = function() {
  		console.log('Create');
	    $scope.submitted = true;

	    if ($scope.form.$valid) {
	    	console.log('valid');

	    	var phone = $scope.address.phone;
	    	var street = $scope.address.street;
	    	var isDefault = $scope.address.default;
	    	var city = $('#city').find(":selected").text();
	    	var district = $('#district').find(":selected").text();
	    	var ward = $('#ward').find(":selected").text();
	    	// console.log(phone);
	    	// console.log(street);
	    	// console.log(city);
	    	// console.log(district);
	    	// console.log(ward);
	    	
	      Address.save({
	      	uid: Auth.getCurrentUser()._id,
	      	phone: phone,
	      	city: city,
	      	district: district,
	      	ward: ward,
	      	street: street,
	      	default: isDefault
	      })
	      	.$promise.then((res) => {
	      		console.log(res);
	      	});
   		}
  	}

		$http.get('/api/addresses/city')
    	.then((res) => {
    		$scope.cities = res.data.LtsItem;
    		console.log($scope.cities);
    	});  	

   	$scope.$watch('address.city', function(newVal) {
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
