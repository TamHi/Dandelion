angular.module('dandelionApp')
  .controller('NavbarCtrl', function ($scope, Auth, $aside, ngCart) {
    $scope.menu = [{
      'title': 'Trang chủ',
      'state': 'main'
    }, {
      'title': 'Shop',
      'state': 'products'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.showCart = function() {
      $aside.open({
        templateUrl: 'aside-cart.html',
        placement: 'right',
        // size: 'sm',
        windowClass: 'app-modal-window',
        backdrop: true,
        controller: function($scope, $uibModalInstance) {
          $scope.ok = function(e) {
            $uibModalInstance.close();
            e.stopPropagation();
          };
          $scope.cancel = function(e) {
            $uibModalInstance.dismiss();
            e.stopPropagation();
          };
        }
      })
      // .result.then(postClose, postClose);
    };

    // $scope.search = function () {
    //   $rootScope.$broadcast('search:term', $scope.searchTerm);
    // };

    // $scope.redirect = function () {
    //   $state.go('products');
    //   // timeout makes sure that it is invoked after any other event has been triggered.
    //   $timeout(function () {
    //     // focus on search box
    //     var searchBox = $window.document.getElementById('searchBox');
    //     if(searchBox){ searchBox.focus(); }
    //   })
    // };
  });