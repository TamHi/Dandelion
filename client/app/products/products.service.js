'use strict';

angular.module('dandelionApp')
  .factory('Product', function ($resource) {
    
    return $resource('/api/products/:id/:controller', null, {
      'update': { 
      	method: 'PUT' 
      }//,
     //  'catalog': { 
     //  	method: 'GET', 
     //  	isArray: true,
     //  	params: { controller: 'catalog' }
    	// }//,
     //  'search': { 
     //  	method: 'GET', 
     //  	isArray: true,
     //  	params: { controller: 'search' }
    	// }
    });
    
  });
