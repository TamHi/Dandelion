'use strict';

angular.module('dandelionApp')
  .factory('Product', function ($resource, $timeout, $q, Upload) {
    
    var resource =  $resource('/api/products/:id', null, {
      'update': { 
      	method: 'PUT' 
      }
    });

    resource.upload = function(files, productId) {
      var d = $q.defer();
      console.log(files);

      if (files && !files.$error) {
        files.upload = Upload.upload({
          url: '/api/products/'+productId+'/upload',
          file: files
        });

        files.upload.then(function (response) {
          console.log(response);
          $timeout(function () {
            d.resolve(response.data);
          });
        }, function (response) {
          if (response.status > 0){
            d.reject(response);
          }
        });

        files.upload.progress(function (evt) {
          d.notify({progress: Math.min(100, parseInt(100.0 * evt.loaded / evt.total))}, evt);
        });
      } else {
        d.reject(files ? files.$error : 'No picture file');
      }
      return d.promise;
    };

    return resource;
    
  });
