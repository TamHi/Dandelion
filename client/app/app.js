'use strict';

angular.module('dandelionApp', [
  'dandelionApp.auth',
  'dandelionApp.admin',
  'dandelionApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngFileUpload'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
