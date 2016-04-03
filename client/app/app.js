'use strict';

angular.module('dandelionApp', [
  'dandelionApp.auth',
  'dandelionApp.admin',
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngFileUpload',
  'ngCart',
  'ngAside',
  'angularSlideables',
  'underscore'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })

  .run(function($rootScope, cart, Auth) {
    // Watch login state
    $rootScope.$watch(function() { 
      if(typeof Auth.getToken() === 'undefined') {
        return false;
      }
      else return true;
    }, function(newValue) {
      console.log(newValue);
      if(newValue) {
        // Wait for getCurrentUser to resolve
        Auth.getCurrentUser().$promise.then(() => {
          // If anomynous cart is empty => fetch from DB
          // Else update DB
          cart.fetchUserCart()
            .then(() => {
              cart.subscribe();
            });
        });
      }
    });
  })
