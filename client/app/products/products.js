'use strict';

angular.module('dandelionApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/products',
        templateUrl: 'app/products/templates/product-list.html',
        controller: 'ProductsCtrl'
      })
      .state('viewProduct', {
        url: '/products/:id',
        templateUrl: 'app/products/templates/product-view.html',
        controller: 'ProductViewCtrl'
      })
  });
