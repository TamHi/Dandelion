'use strict';

angular.module('dandelionApp.auth', [
  'dandelionApp.constants',
  'dandelionApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
