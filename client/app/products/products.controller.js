'use strict';

var errorHandler,
    uploadHander;

angular.module('dandelionApp')
  .controller('ProductsCtrl', function ($scope, Product) {
    $scope.products = Product.query();

    $scope.myFilter = function(product) {
      if($scope.catalog) {
        return product.categories.slug === $scope.catalog;
      }
      return product;
    };

    $scope.predicate = 'slug';
    $scope.order = function(predicate) {
      $scope.predicate = predicate;
    };

    $scope.$on('catalog-search', function(event, args) {
      $scope.catalog = args;
    })
  })

  .controller('ProductViewCtrl', function($scope, $state, $stateParams, Product) {

  	$scope.product = Product.get({id: $stateParams.id}, function(product) {
      $scope.mainImageUrl = product.imageUrl[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  });