'use strict';

angular.module('dandelionApp')
  .controller('CheckoutPaymentCtrl', function($scope, Checkout, ngCart, token, $http, _, $state) {
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
  		$scope.checkout.teardown(function() {
  			$scope.checkout = null;
  		})
  	};
	  	

  	$scope.order = function(payload) {
  		console.log('Order');
  		var items = [];
	  	_.each(ngCart.getCart().items, function(item) {
				items.push({
					_id: item._id,
					quantity: item._quantity,
					total: item.getTotal()
				})
			});

			// console.log(items);

  		if($scope.paymentMethod === 'cash') {
  			$http.post('/api/orders', {
  				shippingAddress: Checkout.getAddress()._id,
  				items: items,
  				type: 'cash',
  				total: ngCart.totalCost()
  			})
  				.then((res) => { console.log(res)});
  		}
  		else if (payload) {
  			$http.post('/api/orders', {
  				shippingAddress: Checkout.getAddress()._id,
  				items: items,
  				type: payload.type,
  				total: ngCart.totalCost(),
  				nonce: payload.nonce
  			})
  				.then((res) => { 
  					console.log(res)
  					ngCart.empty(true);
            $state.go('products');
  				});	
		
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
    };
  });
