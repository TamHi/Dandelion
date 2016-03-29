'use strict';

angular.module('dandelionApp')
  .directive('navbar', () => ({
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarCtrl',
    controllerAs: 'nav'
  }));
