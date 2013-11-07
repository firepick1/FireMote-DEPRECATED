'use strict';


// Declare app level module which depends on filters, and services
angular.module('FireMote', [
  'ngRoute',
  'FireMote.bootstrap',
  'FireMote.filters',
  'FireMote.services',
  'FireMote.directives',
  'FireMote.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/status', {templateUrl: 'partials/status.html', controller: 'StatusCtrl'});
  $routeProvider.when('/calibrate', {templateUrl: 'partials/calibrate.html', controller: 'CalibrateCtrl'});
  $routeProvider.when('/spindle', {templateUrl: 'partials/spindle.html', controller: 'SpindleCtrl'});
  $routeProvider.when('/camera', {templateUrl: 'partials/camera.html', controller: 'CameraCtrl'});
  $routeProvider.when('/jog', {templateUrl: 'partials/jog.html', controller: 'JogCtrl'});
  $routeProvider.otherwise({redirectTo: '/status'});
}]);
