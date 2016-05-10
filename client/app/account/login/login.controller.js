'use strict';

angular.module('dandelionApp')
  .controller('LoginController', function($scope, Auth, $state) {
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
          $state.go('main');
        })
        .catch(err => {
          $scope.errors.other = err.message;
        });
      }
    }
  });
