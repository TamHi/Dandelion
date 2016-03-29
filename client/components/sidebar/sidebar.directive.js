'use strict';

angular.module('dandelionApp')
  .directive('sidebar', () => ({
    templateUrl: 'components/sidebar/sidebar.html',
    restrict: 'E',
    controller: 'SidebarCtrl',
    controllerAs: 'sb',
    link: function() {
      
      $('.category-products .panel-default .panel-heading .panel-title a').click(function (e) {
		    e.preventDefault();
			});
    } 
  }));