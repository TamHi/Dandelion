'use strict';

angular.module('dandelionApp')
  .controller('CreateAddressesController', function($scope, Auth, $http, Address, $state) {
  	$scope.address = {};

  	$scope.createAddress = function() {
  		// console.log('Create');
	    $scope.submitted = true;

	    if ($scope.form.$valid) {
	    	// console.log('valid');

	    	var name = $scope.address.name;
	    	var phone = $scope.address.phone;
	    	var city = {
	    		id: $scope.address.city.ID,
	    		title: $scope.address.city.Title
	    	};
	    	var district = {
	    		id: $scope.address.district.ID,
	    		title: $scope.address.district.Title
	    	};
	    	var ward = {
	    		id: $scope.address.ward.ID,
	    		title: $scope.address.ward.Title
	    	};
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
	      		$state.go('account.addresses');
	      	});
   		}
  	};

		$http.get('/api/addresses/city')
    	.then((res) => {
    		$scope.cities = res.data.LtsItem;
    		// $scope.address.city = $scope.cities[0];
    		// console.log($scope.cities);
    	});  	

   	$scope.$watch('address.city', function(newVal) {
    	if(typeof newVal !== 'undefined') {
    		$http.get('/api/addresses/city/'+newVal.ID+'/district')
	    		.then((res) => {
	    			$scope.districts = res.data;
	    			// console.log(res.data);
	    		});
    	}
    });

    $scope.$watch('address.district', function(newVal) {
    	if(typeof newVal !== 'undefined') {
    		$http.get('/api/addresses/district/'+newVal.ID+'/ward')
	    		.then((res) => {
	    			$scope.wards = res.data;
	    			// console.log(res.data);
	    		});
    	}
    });
     
  });
