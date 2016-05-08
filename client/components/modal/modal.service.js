'use strict';

angular.module('dandelionApp')
  .factory('Modal', function($rootScope, $uibModal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $uibModal.open() returns
     */
    function openModal(scope = {}, modalClass = 'modal-default') {
      var modalScope = $rootScope.$new();

      angular.extend(modalScope, scope);

      return $uibModal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {
        /**
         * Create a function to open a logOut confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when logOut is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        logOut(del = angular.noop) {
          /**
           * Open a logOut confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                // name = args[0].name,
                logOut;

            logOut = openModal({
              modal: {
                dismissable: true,
                title: 'Xác nhận',
                html: '<p>Bạn có chắc bạn muốn đăng xuất?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Xác nhận',
                  click: function(e) {
                    logOut.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Hủy bỏ',
                  click: function(e) {
                    logOut.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            logOut.result.then(function(event) {
              del.apply(event, args);
            });
          };
        },

        /**
         * Create a function to open a completeOrder confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when completeOrder is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        completeOrder(del = angular.noop) {
          /**
           * Open a completeOrder confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                // name = args[0].name,
                completeOrder;

            completeOrder = openModal({
              modal: {
                dismissable: true,
                title: 'Xác nhận',
                html: '<p>Bạn có chắc bạn muốn xác nhận hoàn thành order?</p>',
                buttons: [{
                  classes: 'btn-success',
                  text: 'Xác nhận',
                  click: function(e) {
                    completeOrder.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Hủy bỏ',
                  click: function(e) {
                    completeOrder.dismiss(e);
                  }
                }]
              }
            }, 'modal-success');

            completeOrder.result.then(function(event) {
              del.apply(event, args);
            });
          };
        },

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete(del = angular.noop) {
          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                // name = args[0].name,
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Xác nhận',
                html: '<p>Bạn có chắc bạn muốn xóa?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Xóa',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Hủy bỏ',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  });
