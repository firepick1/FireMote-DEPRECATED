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
var bootstrap = angular.module('FireMote.bootstrap', ['ui.bootstrap']);

var controllers = angular.module('FireMote.controllers', []);


controllers.controller('LogCtrl', ['$scope','$location',function(scope, location) {
    scope.view = "LOG";

    scope.logUrl = function() {
    	return "/firemote/log?level=" + scope.machine.logLevel;
    }

}]);

controllers.controller('MoveCtrl', ['$scope','$location',function(scope, location) {
    scope.view = "MOVE";
		
		var spindles = scope.machine.gantries[0].head.spindles;

    scope.jogAxis = function(axis, delta) {
			var newPos = axis.pos*1 + delta*1;
			if (0 <= newPos && newPos <= axis.posMax) {
			  axis.pos = newPos;
				scope.postMachineState();
			}
    }
}]);

controllers.controller('CameraCtrl', ['$scope','$location',function(scope, location) {
    scope.view = "CAMERA";
		scope.global.imageLarge = true;

}]);

controllers.controller('ConfigureCtrl', ['$scope','$location',function(scope, location) {
    scope.view = "CONFIGURE";

}]);

controllers.controller('SpindleCtrl', ['$scope','$location',function(scope, location) {
    scope.view = "SPINDLE";

    scope.rotateStyle = function(head) {
      return "-moz-transform: rotate(" + head.angle + "deg);" +
        "-webkit-transform: rotate(" + head.angle + "deg);" +
        "-o-transform: rotate(" + head.angle + "deg)";
    }
    scope.vacuumClick = function(spindle) {
      var nextStateOn = !spindle.on;
      if (nextStateOn) { 
        spindle.part = spindle.pos == 0;
      } else {
        spindle.part = false;
      }
    }
}]);

controllers.controller('StatusCtrl', ['$scope','$location', function(scope, location ) {
    scope.view = "STATUS";
		var df = new firemote.DeltaFactory();
		var diff = df.diff(scope.machineRemote, scope.machine);
		scope.diffLocal = diff;
		
}]);

controllers.controller('CalibrateCtrl', ['$scope','$location', function(scope, location) {
    scope.view = "CALIBRATE";

    scope.calibrateClick = function () {
      scope.postMachineState();
		  for (var i = 0; i < scope.linearAxes.length; i++) {
				scope.linearAxes[i].calibrate = "";
			}
    }
    scope.calibrateCancel = function () {
		  for (var i = 0; i < scope.linearAxes.length; i++) {
				scope.linearAxes[i].calibrate = "";
			}
    }
    scope.calibrateClass = function() {
		  var result = "hide";
			for (var i = 0; i < scope.linearAxes.length; i++) {
			  if (scope.linearAxes[i].calibrate === "") {
				  // no calibration
				} else {
				  result = "";
				}
			}
			return result;
    }
}]);

controllers.controller('MainCtrl', ['$scope','$location','$timeout','BackgroundThread', 
  function(scope, location, $timeout, BackgroundThread) {
    scope.view = "MAIN";
		scope.global = {
			imageLarge:false,
			partOpacity: 0,
			rulerOpacity: 0,
			};
		scope.scores = [
			{name:"Bob", score:2},
			{name:"Mary", score:4},
			{name:"Alice", score:8}
			]
    scope.control = location.path() || "/status";
    scope.isActive = [];

    scope.camImageClick = function() {
      scope.global.imageLarge = !scope.global.imageLarge;
    }
    scope.camClass = function() {
      return scope.global.imageLarge ? "" : "cam-thumb";
    }
    scope.ctrlBtnStyle = function(control) {
      return (scope.control === control) ?
        "background-color: #FA0; border:none; height: 40px; z-index:2;" :
        "background-color: #efefef; border:none; height: 40px; z-index:0";
    }
    scope.demoClick = function() {
			alert("not implemented");
    }
    scope.hsliderLeft = function() {
      return (scope.machine.gantries[0].axis.pos * (700 - 36) / scope.machine.gantries[0].axis.posMax); 
    }
    scope.hsliderNumberClass = function() {
      return scope.machine.gantries[0].head.camera.light ? "hslider-number hslider-number-light": "hslider-number";
    }
    scope.hsliderSpindleClass = function(spindle, index) {
      var result = "spindle spindle-" + index;

      result += spindle.on ? " spindle-on" : "";
      result += spindle.pos == 0 ? " spindle-down" : "";
      result += spindle.part ? " spindle-loaded" : "";

      return result;
    }
		scope.hsliderChange = function(axis) {
			axis.pos = axis.pos*1; // convert slider string to number
			if (scope.hsliderPromise) {
				$timeout.cancel(scope.hsliderPromise);
			}
			scope.hsliderPromise = $timeout(function() {
				scope.hsliderPromise = false;
				scope.postMachineState();
			}, 1000);
		};
    scope.viewControl = function(control) {
      location.path(control);
      scope.control = control;
    };
    scope.onMachineStateReceived = function(remoteMachineState) {
			try {
				if (scope.hasOwnProperty("machine")) {
					var newMachineRemote = new firemote.MachineState(remoteMachineState);
					var df = new firemote.DeltaFactory();
					var diffRemote = df.diff(scope.machineRemote, newMachineRemote);
					scope.diffLocal = df.diff(scope.machineRemote, scope.machine);
					scope.updated = new Date().toLocaleTimeString();
					df.applyDiff(diffRemote, scope.machineRemote);
					df.applyDiff(diffRemote, scope.machine);
					scope.diffRemote = diffRemote || scope.diffRemote;
					//df.applyDiff(scope.diffLocal, scope.machine);
					scope.t = BackgroundThread.t;
				} else {
					scope.machineRemote = new firemote.MachineState(remoteMachineState);
					scope.remoteAxes = scope.machineRemote.linearAxes();
					var UGLY_SLIDER_FIX = true;
					if (UGLY_SLIDER_FIX) {
						for (var i = 0; i < scope.remoteAxes.length; i++) {
							scope.remoteAxes[i].pos = 0;  
							console.log(JSON.stringify(scope.remoteAxes[i]));
						}
					}
					scope.machine = new firemote.MachineState(scope.machineRemote);
					scope.linearAxes = scope.machine.linearAxes();
					console.log("Initialized from remote machine state:\n" + JSON.stringify(remoteMachineState));
				}
			} catch (e) {
				alert("onMachineStateReceived()\n" + e);
				return false;
			}
			return true;
    };
    scope.postMachineState = function() {
			scope.machine.stateId = scope.machineRemote.stateId + 1;
			scope.machine.validate();
			var diff = new firemote.DeltaFactory().diff(scope.machineRemote, scope.machine);
			if (diff) {
				BackgroundThread.postMachineStateDiff(diff, scope.onMachineStateReceived);
			}
    };
    scope.updateStatus = function() {
      BackgroundThread.get(scope.onMachineStateReceived);
    };
		BackgroundThread.onMachineStateReceived = scope.onMachineStateReceived;
    scope.updateStatus();

}]);
