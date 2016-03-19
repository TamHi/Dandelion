'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, Product) {
    this.products = Product.query();
  }
}

angular.module('dandelionApp')
  .controller('MainController', MainController);

})();
