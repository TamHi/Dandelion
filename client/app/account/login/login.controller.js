'use strict';

angular.module('dandelionApp')
  .controller('LoginController', function($rootScope, $scope, Auth, $state) {
    $scope.user = {};
    $scope.errors = {};
    $scope.submitted = false;

    console.log($rootScope.previousState);

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(() => {

          // Logged in, redirect to require page or main
          var returnState = ($rootScope.requiredAuthState) ? $rootScope.requiredAuthState : $rootScope.previousState;
          $state.go(returnState || 'main');
        })
        .catch(err => {
          $scope.errors.other = err.message;
        });
      }
    }
  });
