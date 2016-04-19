'use strict';

angular.module('dandelionApp.admin')
  .controller('AdminProductsCtrl', function($scope, Product) {

    /**
     * Loading
     */
    $scope.loading = true;

    Product.query().$promise
      .then(products => {
        $scope.products = products;
        $scope.loading = false;
      });

    console.log($scope.products);
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

  .controller('AdminProductEditCtrl', function($scope, Product, $stateParams, $state, $http, Upload) {
   
    Product.get({id: $stateParams.id}).$promise
      .then(res => {
        $scope.product = res;
        console.log(res.imageUrl[0]);
        var url = '/assets/uploads/aothun-1.jpg';
        Upload.urlToBlob(url).then(function(blob) {
          console.log(blob);
          console.log(Upload.isFile(blob));
          $scope.product.pictures = blob;
          console.log($scope.product.pictures);
        });

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