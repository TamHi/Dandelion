'use strict';

angular.module('dandelionApp.admin')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .when('/admin', '/admin/dashboard');

    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        // controller: 'AdminController',
        // controllerAs: 'admin',,
        controller: 'RDashMasterCtrl',
        authenticate: 'admin'
      })
        .state('admin.dashboard' , {
          url: '/dashboard',
          // templateUrl: 'app/admin/customers/customers.html',
          templateUrl: 'components/rdash/templates/dashboard.html',
          // controller: 'AdminCustomersCtrl',
          authenticate: 'admin'
        })

        .state('admin.customers' , {
          url: '/customers',
          templateUrl: 'app/admin/customers/customers.html',
          controller: 'AdminCustomersCtrl',
          authenticate: 'admin'
        })
          .state('admin.customers.detail' , {
            url: '/customers/:id',
            templateUrl: 'app/admin/customers/customer-detail.html',
            controller: 'AdminCustomersDetailCtrl',
            authenticate: 'admin'
          })

        .state('admin.products' , {
          url: '/products',
          templateUrl: 'app/admin/products/products.html',
          controller: 'AdminProductsCtrl',
          authenticate: 'admin'
        })
        .state('admin.createProducts', {
          url: '/products/create',
          templateUrl: 'app/admin/products/create-product.html',
          controller: 'AdminProductCreateCtrl',
          authenticate: 'admin'
        })
        .state('admin.editProducts', {
          url: '/products/edit/:id',
          templateUrl: 'app/admin/products/edit-product.html',
          controller: 'AdminProductEditCtrl',
          authenticate: 'admin'
        })

        .state('admin.orders' , {
          url: '/orders',
          templateUrl: 'app/admin/orders/orders.html',
          controller: 'AdminOrdersCtrl',
          authenticate: 'admin'
        })
  });
