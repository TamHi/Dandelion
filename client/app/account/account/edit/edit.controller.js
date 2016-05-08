'use strict';

angular.module('dandelionApp')
  .controller('EditController', function($scope, Auth, User, Modal, $state) {

    $scope.errors = {};
    $scope.submitted = false;
    $scope.changePwd = false;

    $scope.user = {
      name: Auth.getCurrentUser().name,
      email: Auth.getCurrentUser().email,
      gender: Auth.getCurrentUser().gender
    };

    $scope.updateInfo = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.update($scope.user)
          .then(function() {
            Modal.confirm.logOut(() => {
              $state.go('main');
            })();
          })
          .catch(function() {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
          });
      }
    };
  });
