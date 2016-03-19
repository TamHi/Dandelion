'use strict';

angular.module('dandelionApp')
  .factory('Product', function ($resource) {
    
    return $resource('/api/products/:id', null, {
      'update': { method: 'PUT' }
    });
    
  });
