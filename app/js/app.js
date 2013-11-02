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
  $routeProvider.when('/view1', {templateUrl: 'partials/calibrate.html', controller: 'CalibrateCtrl'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
