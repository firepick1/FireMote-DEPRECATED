'use strict';

/* Controllers */

angular.module('FireMote.controllers', []).
  controller('MyCtrl1', [function($scope) {

		$scope.foo = "FOO1";


  }])
  .controller('MyCtrl2', [function($scope) {

  }]);

function CalibrateCtrl($scope, $location) {
}

function MainCtrl($scope, $location) {
		$scope.foo = "FOOMAIN";
		$scope.imageLarge = false;
		$scope.headPos = 100;
		$scope.headPosMax = 625;
		$scope.sliderW = 44;

		$scope.camImageHeight = function() {
			return $scope.imageLarge ? "100%" : "65px";
		}

		$scope.camImageClick = function() {
			$scope.imageLarge = !$scope.imageLarge;
		}

		$scope.go = function(hash) {
			$location.path(hash);
		}
}

