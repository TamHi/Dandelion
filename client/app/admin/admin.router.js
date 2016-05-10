'use strict';

angular.module('dandelionApp.admin')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .when('/admin', '/admin/dashboard');

    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController',
        // controllerAs: 'admin',
        authenticate: 'admin'
      })

        /*
          DASHBOARD
         */
        .state('admin.dashboard' , {
          url: '/dashboard',
          // templateUrl: 'app/admin/customers/customers.html',
          templateUrl: 'app/admin/dashboard/dashboard.html',
          controller: 'AdminDashboardCtrl',
          authenticate: 'admin'
        })

        /*
          CUSTOMERS
         */
        .state('admin.customers' , {
          url: '/customers',
          templateUrl: 'app/admin/customers/customers.html',
          controller: 'AdminCustomersCtrl',
          authenticate: 'admin'
        })
          .state('admin.customers-addresses' , {
            url: '/customers/:id/addresses',
            templateUrl: 'app/admin/customers/addresses/admin-customer-addresses.html',
            controller: 'AdminCustomerAddressesCtrl',
            authenticate: 'admin'
          })
          .state('admin.customers-orders' , {
            url: '/customers/:id/orders',
            templateUrl: 'app/admin/customers/orders/admin-customer-orders.html',
            controller: 'AdminCustomerOrdersCtrl',
            authenticate: 'admin'
          })

        /*
          PRODUCTS
         */
        .state('admin.products' , {
          url: '/products',
          templateUrl: 'app/admin/products/products.html',
          controller: 'AdminProductsCtrl',
          authenticate: 'admin'
        })
        .state('admin.createProduct', {
          url: '/products/create',
          templateUrl: 'app/admin/products/create-product.html',
          controller: 'AdminProductCreateCtrl',
          authenticate: 'admin'
        })
        .state('admin.editProduct', {
          url: '/products/edit/:id',
          templateUrl: 'app/admin/products/edit-product.html',
          controller: 'AdminProductEditCtrl',
          authenticate: 'admin'
        })

        /*
          ORDERS
         */
        .state('admin.orders' , {
          url: '/orders',
          templateUrl: 'app/admin/orders/orders.html',
          controller: 'AdminOrdersCtrl',
          authenticate: 'admin'
        })
  });
