'use strict';

angular.module('dandelionApp.admin')
  .controller('AdminProductsCtrl', function($scope, Product, Modal) {

    /**
     * Loading
     */
    $scope.loading = true;

    Product.query().$promise
      .then(products => {
        $scope.products = products;
        $scope.loading = false;
      });

    $scope.delete = Modal.confirm.delete((product) => {
      console.log(product);
      Product.delete({id: product._id}).$promise
        .then(() => {
          $scope.products.splice($scope.products.indexOf(product), 1);
        })
    }); 
  })

  .controller('AdminProductCreateCtrl', function($scope, Product, $state, $http, $timeout) {

    $scope.product = {}; // create a new instance

    $http.get('/api/catalogs/')
      .then((res) => {
        $scope.catalogs = res.data;
      });

    $scope.createProduct = function(){
      console.log($scope.product);
      return Product.save($scope.product).$promise.then(function (product) {
        return Product.upload($scope.product.pictures, product._id);
      }).then(function (product) {
        $state.go('admin.products');
      }).catch(errorHandler($scope));
    };
    
  })

  .controller('AdminProductEditCtrl', function($scope, Product, $stateParams, $state, $http, Upload, _) {
   
    Product.get({id: $stateParams.id}).$promise
      .then(res => {
        $scope.product = res;
        $scope.product.pictures = [];
        
        _.each($scope.product.imageUrl, (path) => {
          Upload.urlToBlob(path).then(function(blob) {
            $scope.product.pictures.push(blob);
          });
        });

        $http.get('/api/catalogs/')
          .then(res => {
            $scope.catalogs = res.data;
            $scope.product.categories = $scope.product.categories._id;
          })
      });

    $scope.editProduct = function(){
      console.log($scope.product);
      return Product.update({id: $scope.product._id}, $scope.product).$promise.then(function (product) {
        return Product.upload($scope.product.pictures, product._id);
      }).then(function (product) {
        $state.go('admin.products');
      }).catch(errorHandler($scope));
    };

  });

var errorHandler = function(scope) {
  return function error(httpResponse) {
    scope.errors = httpResponse;
  };
};