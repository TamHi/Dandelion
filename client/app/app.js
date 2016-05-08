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
  'underscore',
  'slick',
  'frapontillo.bootstrap-switch'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })

  .run(function($rootScope, cart, Auth) {

    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
      $rootScope.currentState = toState.name;
      $rootScope.isAdminState = (toState.name.indexOf('admin') > -1) ? true:false;
    });

    // Watch login state
    $rootScope.$watch(function() { 
      if(typeof Auth.getToken() === 'undefined') {
        return false;
      }
      else return true;
    }, function(newValue) {
      // console.log(newValue);
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
