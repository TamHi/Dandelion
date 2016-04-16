'use strict';

(function() {

angular.module('dandelionApp.auth')
  .run(function($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      // console.log(next.name);
      // console.log(next.authenticate);
      

      if (!next.authenticate) {
        $rootScope.previousState = current.name;
        // console.log(current.name);
        return;
      }

      if (typeof next.authenticate === 'string') {
        Auth.hasRole(next.authenticate, _.noop).then(has => {
          if (has) {
            return;
          }

          event.preventDefault();
          return Auth.isLoggedIn(_.noop).then(is => {
            // console.log(is);
            $state.go(is ? 'main' : 'login');
          });
        });
      } else {
        // console.log('Not string');
        Auth.isLoggedIn(_.noop).then(is => {
          if (is) {
            return;
          }

          $rootScope.requiredAuthState = next.name;
          // console.log(next.name);
          event.preventDefault();
          $state.go('login');
        });
      }
    });
  });

})();
