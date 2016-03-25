'use strict';

var errorHandler,
    uploadHander;

angular.module('dandelionApp')
  .controller('ProductsCtrl', function ($scope, Product) {
    $scope.products = Product.query();
  })

  .controller('ProductViewCtrl', function($scope, $state, $stateParams, Product) {

  	$scope.product = Product.get({id: $stateParams.id});

  	$scope.deleteProduct = function() {
  		Product.delete({id: $scope.product._id}, function () {
        $state.go('products');
      }, errorHandler($scope));
  	};
  })

  .controller('ProductNewCtrl', function($scope, $state, Product) {
  	$scope.product = {};
  	$scope.addProduct = function() {
      Product.save($scope.product, function(value) {
        $state.go('viewProduct', {id: value._id});
      }, errorHandler($scope));
    };
  })

  .controller('ProductEditCtrl', function($scope, $state, $stateParams, Product, Upload, $timeout) {
  	$scope.product = Product.get({id: $stateParams.id});

  	$scope.editProduct = function() {
  		Product.update({id: $scope.product._id}, $scope.product, function(value) {
        $state.go('viewProduct', {id: value._id});
      }, errorHandler($scope));
  	};

    $scope.upload = uploadHander($scope, Upload, $timeout);
  })

  .controller('ProductCheckoutCtrl', function($scope, $http, $state, ngCart, token) {

    braintree.setup(token, "dropin", {
      container: "payment-form",
      onPaymentMethodReceived: function(payload) {
        // angular.merge(payload, ngCart.toObject());
        // payload.total = payload.totalCost;
        console.log(payload);

        // $http.post('/api/orders', payload)
        //   .then(function (res) {
        //     console.log(res.data);
        //     ngCart.empty(true);
        //     $state.go('products');
        //   })
        //   .catch(function(res) {
        //     $scope.errors = res;
        //   })
      }
    });

    console.log(ngCart);
    // $scope.errors = '';
    // console.log(ngCart.toObject());

    // $scope.paymentOptions = {
    //   onPaymentMethodReceived: function(payload) {
    //     angular.merge(payload, ngCart.toObject());
    //     payload.total = payload.totalCost;
    //     console.log(payload);

    //     $http.post('/api/orders', payload)
    //       .then(function (res) {
    //         console.log(res.data);
    //         ngCart.empty(true);
    //         $state.go('products');
    //       })
    //       .catch(function(res) {
    //         $scope.errors = res;
    //       })
    //   }
    // }
  })

errorHandler = function(scope) {
  return function error(httpResponse) {
    scope.errors = httpResponse;
  };
};

uploadHander = function($scope, Upload, $timeout) {
  return function(file) {
    if(file && !file.$error) {
      $scope.file = file;

      file.upload = Upload.upload({
        url: 'api/products/'+$scope.product._id+'/upload',
        file: file
      })
      
      file.upload.then(function(res) {
        $timeout(function() {
          file.result = res.data;
        });
      }, function(res) {
        if(res.status > 0) {
          console.log(res.status + ':' + res.data);
          errorHandler($scope)(res.status + ':' + res.data);
        }
      });

      file.upload.progress(function(evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      })
    }
  }
};