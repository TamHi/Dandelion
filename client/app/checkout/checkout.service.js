'use strict';

angular.module('dandelionApp')
  .factory('Checkout', function($q, Address, _) {

    var checkout = {
      queryAddress: function() {
        var deferred = $q.defer();

        Address.query().$promise
          .then((res) => {
            // console.log(res);
            this.addresses = res;
            console.log(this.addresses);
            deferred.resolve(this.addresses);
          });

        return deferred.promise;
      },

      getDefaultAddress: function() {
        this.defaultAdress = _.find(this.addresses, function(address) {
          return address.default === true;
        })
        console.log(this.defaultAdress);
        return this.defaultAdress;
      },

      setAddress: function(id) {
        this.address = _.find(this.addresses, function(address) {
          return address._id === id;
        });

        console.log(this.address);
        return this.address;
      },

      getAddress: function() {
        console.log(this.address);
        return this.address;
      }

    };

    return checkout;
  });
