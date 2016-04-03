'use strict';

angular.module('dandelionApp')
  .controller('CheckoutPaymentCtrl', function($scope, Checkout, token) {

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
  });
