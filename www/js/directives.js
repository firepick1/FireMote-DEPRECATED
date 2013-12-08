'use strict'; 
/* Directives */
var directives = angular.module('FireMote.directives', []);

directives.directive('appVersion', ['version', function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}]);

directives.directive('rangeMax', ['$interpolate', function($interpolate) {
	return {
	  restrict:'A',
		compile: function compile(tElt, tAttrs, transclude) {
		  return {
			  pre: function (scope, elm, attrs) {
					scope.$watch(attrs.rangeMax, function(value) {
						console.log("rangeMax:" + value);
						elm.attr('max', value);
					})
					scope.$watch(attrs.ngModel, function(value) {
						console.log("ngModel:" + value);
					})
				}
			};
		}
	}
}]);
