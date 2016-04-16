'use strict';

angular.module('dandelionApp')
  .factory('Product', function ($resource, $timeout, $q, Upload) {
    
    var resource =  $resource('/api/products/:id', null, {
      'update': { 
      	method: 'PUT' 
      }
    });

    resource.upload = function(file, productId) {
      var d = $q.defer();
      console.log(file);

      if (file && !file.$error) {
        file.upload = Upload.upload({
          url: '/api/products/'+productId+'/upload',
          file: file
        });

        file.upload.then(function (response) {
          console.log(response);
          $timeout(function () {
            d.resolve(response.data);
          });
        }, function (response) {
          if (response.status > 0){
            d.reject(response);
          }
        });

        file.upload.progress(function (evt) {
          d.notify({progress: Math.min(100, parseInt(100.0 * evt.loaded / evt.total))}, evt);
        });
      } else {
        d.reject(file ? file.$error : 'No picture file');
      }
      return d.promise;
    };

    return resource;
    
  });
