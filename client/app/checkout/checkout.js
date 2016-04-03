angular.module('dandelionApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .when('/checkout', 'checkout/shipping');

    $stateProvider
      .state('checkout', {
        url: '/checkout',
        abstract: true,
        templateUrl: 'app/checkout/checkout.html',
        controller: 'CheckoutCtrl'
      })
        .state('checkout.shipping' , {
          url: '/shipping',
          templateUrl: 'app/checkout/shipping/shipping.html',
          controller: 'CheckoutShippingCtrl',
          authenticate: true
          
        })
        .state('checkout.payment' , {
          url: '/payment',
          templateUrl: 'app/checkout/payment/payment.html',
          controller: 'CheckoutPaymentCtrl',
          authenticate: true,
          resolve: {
            token: ($q, $http) => {
              var deferred = $q.defer();

              $http.get('/api/braintree/client_token')
                .then((res) => {
                  deferred.resolve(res.data)
                })
                .catch(() => {
                  console.log('Errors');
                })
              return deferred.promise;
            }
          }
        })
  });