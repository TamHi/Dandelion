'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, Product) {
  	
  	this.products = [];

    $http.get('/api/products').then(response => {
      this.products = response.data;
      socket.syncUpdates('product', this.products);
    });

    $scope.$on('destroy', function() {
    	socket.unsyncUpdates('product');
    })
  }
}

angular.module('dandelionApp')
  .controller('MainController', MainController);

})();
