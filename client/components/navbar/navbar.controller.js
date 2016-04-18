angular.module('dandelionApp')
  .controller('NavbarCtrl', function ($scope, Auth, $aside, ngCart, $state) {

    // $scope.menu = [{
    //   'title': 'Trang chủ',
    //   'state': 'main'
    // }, {
    //   'title': 'Shop',
    //   'state': 'products'
    // }];

    $scope.ngCart = ngCart;

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.showCart = function() {
      // console.log('Show cart');
      $aside.open({
        templateUrl: 'aside-cart.html',
        placement: 'right',
        // size: 'sm',
        windowClass: 'app-modal-window',
        backdrop: true,
        controller: function($scope, $uibModalInstance) {
          $scope.checkout = function(e) {
            // alert('Here');
            $state.go('checkout.shipping');
            $uibModalInstance.close();

            e.stopPropagation();
          };
        }
      })
      // .result.then(postClose, postClose);
    };
  });