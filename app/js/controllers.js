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
		$scope.foo = "MAIN";
		$scope.imageLarge = false;
		$scope.headPos = 100;
		$scope.headPosMax = 624;
		$scope.spindleLeft = {pos:0, side:"left", on:true, part:true};
		$scope.spindleRight = {pos:100, side:"right", on:false, part:false};
		$scope.control = $location.path() || "/status";
		$scope.checkboxes = [];
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
		$scope.hsliderLeft = function() {
			return ($scope.headPos * (700 - 36) / $scope.headPosMax); 
		}
		$scope.hsliderSpindleClass = function(spindle) {
			var result = "spindle spindle-" + spindle.side;

			result += spindle.on ? " spindle-on" : "";
			result += spindle.pos == 0 ? " spindle-down" : "";
			result += spindle.part ? " spindle-loaded" : "";

			return result;
		}
		$scope.vacuumClick = function(spindle) {
			spindle.on = !spindle.on;
			if (spindle.on) {
				spindle.part = spindle.pos == 0;
			} else {
				spindle.part = false;
			}
		}
		$scope.vacuumClass = function(spindle) {
			return spindle.on ? "checkbox-on" : "";
		}
		$scope.viewControl = function(control) {
			$location.path(control);
			$scope.control = control;
		}
}

