'use strict';

angular.module('dandelionApp.admin')
  .controller('AdminProductsCtrl', function($scope, Product) {
    $scope.products = Product.query();
  })

  .controller('AdminProductCreateCtrl', function($scope, Product, $state, $http) {

    $scope.product = {}; // create a new instance

    $http.get('/api/catalogs/')
      .then((res) => {
        $scope.catalogs = res.data;
      })

    $scope.createProduct = function(){
      return Product.save($scope.product).$promise.then(function (product) {
        return Product.upload($scope.product.picture, product._id);
      }).then(function (product) {
        $state.go('viewProduct', {id: product._id});
      }).catch(errorHandler($scope));
    };
    
  })

  .controller('AdminProductEditCtrl', function($scope, Product, $stateParams, $state, $http) {
   
    Product.get({id: $stateParams.id}).$promise
      .then(res => {
        $scope.product = res;

        $http.get('/api/catalogs/')
          .then(res => {
            $scope.catalogs = res.data;
            $scope.product.categories = $scope.product.categories._id;
          })
      });

    $scope.editProduct = function(){
      return Product.update({id: $scope.product._id}, $scope.product).$promise.then(function (product) {
        return Product.upload($scope.product.picture, product._id);
      }).then(function (product) {
        $state.go('viewProduct', {id: product._id});
      }).catch(errorHandler($scope));
    };

  });

var errorHandler = function(scope) {
  return function error(httpResponse) {
    scope.errors = httpResponse;
  };
};