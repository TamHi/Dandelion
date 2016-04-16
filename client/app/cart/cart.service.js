'use strict';

angular.module('dandelionApp')
  .service('cart', function ($q, $rootScope, Auth, $http, ngCart) {

  	var listenCartChanged;
  	var updateUserCart = function() {
  		var contents = angular.copy(ngCart.getItems());
			angular.forEach(contents, function(value) {
				value.product = value._id;
				value.quantity = value._quantity;
				delete value._id;
				delete value._name;
				delete value._price;
				delete value._quantity;
			});
			
			$http.put('/api/carts/' + Auth.getCurrentUser()._id, {
				items: contents
			}).catch(() => {
				console.log('Errors');
			});
  	};

    var cart = {
    	subscribe: function() {
    		// console.log('S');

    		listenCartChanged = $rootScope.$on('ngCart:change', function() {
    			updateUserCart();
    		});		
    	},

    	unsubscribe: function() {
    		// console.log('US');
    		listenCartChanged();
    	},

    	fetchUserCart: function() {
    		// console.log(ngCart.getItems());
    		// If cart is empty => Fetch from DB
    		if(ngCart.getItems().length === 0) {
    			// console.log('Enter empty');
    			var deferred = $q.defer();
    			$http.get('/api/carts/' + Auth.getCurrentUser()._id)
	    			.then(function(res) {
	    				var items = res.data.items;
	    			
	    				angular.forEach(items, function(value) {
                // console.log(value);
	    					ngCart.addItem(value.product._id, value.product.name, value.product.price, value.quantity, value.product);
	    				});

	    				deferred.resolve();
	    			});
	    		return deferred.promise;
    		}
    		// Else update cart
    		else {
    			// console.log('Enter not empty');
    			var deferred = $q.defer();
    			updateUserCart();
    			deferred.resolve();
    			return deferred.promise;
    		}		
     	}
    }

    return cart;
  });
