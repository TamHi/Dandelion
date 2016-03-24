'use strict';

angular.module('dandelionApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/products',
        templateUrl: 'app/products/templates/product-list.html',
        controller: 'ProductsCtrl'
      })
      .state('newProduct', {
        url: '/products/new',
        templateUrl: 'app/products/templates/product-new.html',
        controller: 'ProductNewCtrl'
      })
      .state('viewProduct', {
        url: '/products/:id',
        templateUrl: 'app/products/templates/product-view.html',
        controller: 'ProductViewCtrl'
      })
      .state('editProduct', {
        url: '/products/:id/edit',
        templateUrl: 'app/products/templates/product-edit.html',
        controller: 'ProductEditCtrl'
      })
      .state('checkout', {
        url: '/checkout',
        templateUrl: 'app/products/templates/products-checkout.html',
        controller: 'ProductCheckoutCtrl',
        resolve: {
          token: ($q, $http) => {
            var deferred = $q.defer();

            $http.get('/api/braintree/client_token')
              .then((res) => {
                deferred.resolve(res.data)
              })
              .catch(() => {
                console.log('Errors');
              })
            return deferred.promise;
          }
        }
      });
  });
