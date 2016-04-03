'use strict';

angular.module('dandelionApp')
  .controller('EditAddressesController', function($scope, Auth, $http, $state, Address, $stateParams, $timeout, _) {

  	Address.get({ id: $stateParams.id }).$promise
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

        $scope.master = angular.copy($scope.address.default);
      });

    $scope.editAddress = function() {
      // console.log('Edit');
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
        
        Address.update({
          id: $stateParams.id
        },{
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
        // console.log('Cities');
        // console.log($scope.cities);

        $scope.address.city = _.find($scope.cities, function(city){ 
          return city.ID == $scope.address.city.id; 
        });

        // console.log('City');
        // console.log($scope.address.city);
      });
      
    $scope.$watch('address.city', function(newVal) {
      if(typeof newVal !== 'undefined'){
        if(typeof newVal.ID !== 'undefined') {
          // console.log('City newVal');
          // console.log(newVal);
          $http.get('/api/addresses/city/'+newVal.ID+'/district')
            .then((res) => {
              $scope.districts = res.data;
              // console.log('Districts');
              // console.log($scope.districts);

              $scope.address.district = _.find($scope.districts, function(district){ 
                return district.ID == $scope.address.district.id; 
              });

              // console.log('District');
              // console.log($scope.address.district);
            });
        }
      }
    });

    $scope.$watch('address.district', function(newVal) {
      if(typeof newVal !== 'undefined') {
        if(typeof newVal.ID !== 'undefined') {
          // console.log('District newVal');
          // console.log(newVal);
          $http.get('/api/addresses/district/'+newVal.ID+'/ward')
            .then((res) => {
              $scope.wards = res.data;
              // console.log('Wards');
              // console.log($scope.wards);

              $scope.address.ward = _.find($scope.wards, function(ward){ 
                return ward.ID == $scope.address.ward.id; 
              });
              // console.log('Ward');
              // console.log($scope.address.ward);
            });
        }
      }
    });
  });