/*
controllers.js https://github.com/firepick1/FireMote/wiki

Copyright (C) 2013  Karl Lew, <karl@firepick.org>

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
*/

'use strict';

angular.module('FireMote.controllers', []).
  controller('MyCtrl1', [function($scope) {

		$scope.foo = "FOO1";


  }])
  .controller('MyCtrl2', [function($scope) {

  }]);

function JogCtrl($scope, $location) {
		$scope.foo = "JOG";
}
function HeadCtrl($scope, $location) {
		$scope.foo = "HEAD";
}
function StatusCtrl($scope, $location) {
		$scope.foo = "STATUS";
}
function CalibrateCtrl($scope, $location) {
		$scope.foo = "CALIBRATE";
}

function MainCtrl($scope, $location) {
		var SPINDLE_ON_BIT = 1;
		var SPINDLE_DOWN_BIT = 2;
		var SPINDLE_LOADED_BIT = 4;

		$scope.foo = "MAIN";
		$scope.imageLarge = false;
		$scope.headPos = 100;
		$scope.headPosMax = 624;
		$scope.control = $location.path() || "/status";
		$scope.checkboxes = [];
		$scope.spindles = [];
		$scope.isActive = [];


		$scope.calibrate = function () {
			alert("calibrating...");
		}
		$scope.calibrateClass = function() {
			return $scope.checkboxes['calibrateGantry'] 
					|| $scope.checkboxes['calibrateTrayFeeder'] 
					|| $scope.checkboxes['calibratePCBFeeder']
			? "" : "hide";
		}
		$scope.camImageClick = function() {
			$scope.imageLarge = !$scope.imageLarge;
		}
		$scope.camImageHeight = function() {
			return $scope.imageLarge ? "100%" : "65px";
		}
		$scope.checkboxClick = function(id) {
			$scope.checkboxes[id] = $scope.checkboxes[id] ? false : true;
		}

		$scope.checkboxClass = function(id) {
			return $scope.checkboxes[id] ? "checkbox-on" : "";
		}

		$scope.ctrlBtnStyle = function(control) {
			return ($scope.control === control) ?
				"background-color: #FA0; width:105%; border:none; height: 40px;" :
				"background-color: #efefef; border:none; height: 40px;";
		}
		$scope.spindleClass = function(spindle) {
			var result = "spindle spindle-" + spindle;
			var spindleValue = $scope.spindles[spindle] || 0;

			result += (spindleValue & SPINDLE_ON_BIT) ? " spindle-on" : "";
			result += (spindleValue & SPINDLE_DOWN_BIT) ? " spindle-down" : "";
			result += (spindleValue & SPINDLE_LOADED_BIT) ? " spindle-loaded" : "";

			return result;
		}
		$scope.spindleLeft = function() {
			return ($scope.headPos * (700 - 36) / $scope.headPosMax); 
		}
		$scope.viewControl = function(control) {
			$location.path(control);
			$scope.control = control;
		}
}

