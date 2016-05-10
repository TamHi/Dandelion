'use strict';

angular.module('dandelionApp')
  .controller('CheckoutPaymentCtrl', function($scope, Checkout, ngCart, token, $http, _, $state, $cookies) {
  	$scope.paymentMethod = 'cash';

  	$scope.setupBraintree = function() {
  		braintree.setup(token, 'dropin', {
	  		container: 'payment-form',
	  		onPaymentMethodReceived: function(payload) {
	  			console.log('Received');
	  			$scope.order(payload);
	  		},
	  		onReady: function(integration) {
	  			$scope.checkout = integration;
	  		}
	  	});
  	};

  	$scope.teardownBraintree = function() {
      if($scope.checkout){
        $scope.checkout.teardown(function() {
          $scope.checkout = null;
        })
      }
  	};
	  	

  	$scope.order = function(payload) {
  		console.log('Order');
  		var items = [];
	  	_.each(ngCart.getCart().items, function(item) {
				items.push({
					product: item._id,
					quantity: item._quantity,
					total: item.getTotal()
				})
			});

  		if($scope.paymentMethod === 'cash') {
  			$http.post('/api/orders', {
  				shippingAddress: $scope.$parent.chosenAddress,
  				items: items,
  				type: 'Cash',
  				total: ngCart.totalCost()
  			})
  				.then((res) => {
            console.log(res);
            console.log('Empty the cart');
            $cookies.remove('chosenAddress');
            ngCart.empty();
            $state.go('products');
          })
          .catch(err => {
            console.log(err);
            if(err.data.message === 'Out of stock'){
              alert('Out of stock');
            }
          }); 
  		}
  		else if (payload) {
  			$http.post('/api/orders', {
  				shippingAddress: $scope.$parent.chosenAddress,
  				items: items,
  				type: payload.type,
  				total: ngCart.totalCost(),
  				nonce: payload.nonce
  			})
  				.then((res) => { 
  					console.log(res);
            $cookies.remove('chosenAddress');
  					ngCart.empty();
            $state.go('products');
  				})
          .catch(err => {
            console.log(err);
            if(err.data.message === 'Out of stock'){
              alert('Out of stock');
            }
          })
		  }
    };
  });
