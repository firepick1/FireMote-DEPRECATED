'use strict';


// Declare app level module which depends on filters, and services
angular.module('FireMote', [
  'ngRoute',
  'FireMote.filters',
  'FireMote.services',
  'FireMote.directives',
  'FireMote.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/status', {templateUrl: 'partials/status.html', controller: 'StatusCtrl'});
  $routeProvider.when('/calibrate', {templateUrl: 'partials/calibrate.html', controller: 'CalibrateCtrl'});
  $routeProvider.when('/head', {templateUrl: 'partials/head.html', controller: 'HeadCtrl'});
  $routeProvider.when('/jog', {templateUrl: 'partials/jog.html', controller: 'JogCtrl'});
  $routeProvider.otherwise({redirectTo: '/status'});
}]);
