'use strict';

angular.module('dandelionApp')
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
      .when('/account', 'account/edit');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'main',
        template: '',
        controller: function($rootScope, $state, Auth, ngCart, cart) {
          delete $rootScope.requiredAuthState;
          var referrer = $state.params.referrer ||
                          $state.current.referrer ||
                          'main';
          Auth.logout();
          cart.unsubscribe();
          ngCart.empty(true);
          $state.go(referrer);
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state('account', {
        url: '/account',
        abstract: true,
        templateUrl: 'app/account/account/account.html',
        controller: 'AccountController',
        controllerAs: 'vm',
        authenticate: true
      })
        .state('account.edit', {
          url: '/edit',
          templateUrl: 'app/account/account/edit/edit.html',
          controller: 'EditController',
          controllerAs: 'vm',
          authenticate: true
        })
        .state('account.addresses', {
          url: '/address',
          templateUrl: 'app/account/account/addresses/list/list.html',
          controller: 'AddressesController',
          authenticate: true
        })
        .state('account.createAddress', {
          url: '/address/create',
          templateUrl: 'app/account/account/addresses/create/create.html',
          controller: 'CreateAddressesController',
          authenticate: true
        })
        .state('account.editAddress', {
          url: '/address/edit/:id',
          templateUrl: 'app/account/account/addresses/edit/edit.html',
          controller: 'EditAddressesController',
          authenticate: true,
        })
        .state('account.orders', {
          url: '/orders',
          templateUrl: 'app/account/account/orders/orders.html',
          controller: 'OrdersController',
          authenticate: true
        });
  })
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });
