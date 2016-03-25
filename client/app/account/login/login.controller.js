'use strict';

angular.module('dandelionApp')
  .controller('LoginController', function($rootScope, $scope, Auth, $state, cart) {
    $scope.user = {};
    $scope.errors = {};
    $scope.submitted = false;

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(() => {

          // Logged in, redirect to home
          $state.go('main');
        })
        .catch(err => {
          $scope.errors.other = err.message;
        });
      }
    }
  });
