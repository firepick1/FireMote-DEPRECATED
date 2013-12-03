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

    for (var i = 0; i < scope.axes.length; i++) {
      scope.axes[i].posNew = scope.axes[i].pos;
    }

		scope.posEdited = function(axis) {
			axis.posNew = typeof axis.posNew === 'number' ? axis.posNew : parseFloat(axis.posNew);
			axis.posNew = isNaN(axis.posNew) ? axis.pos : axis.posNew;
      axis.posNew = Math.min(axis.posMax,Math.max(0, Math.round(10.0*(axis.posNew))/10.0));
			axis.pos = axis.posNew;
		}

		scope.moveClick = function() {
		  scope.machine.clearForLinearMotion();
      scope.postMachineState();
    }

    scope.jogAxis = function(axis, delta) {
		  scope.machine.clearForLinearMotion();
      delta = typeof delta === 'number' ? delta : parseFloat(delta);
      axis.pos = Math.min(axis.posMax,Math.max(0, Math.round(10.0*(axis.pos + delta))/10.0));
			axis.posNew = axis.pos;
      scope.postMachineState();
    }
}]);

controllers.controller('CameraCtrl', ['$scope','$location',function(scope, location) {
    scope.view = "CAMERA";

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

controllers.controller('StatusCtrl', ['$scope','$location', 'machineLocal', 'machineRemote', 
	function(scope, location, machineLocal, machineRemote) {
    scope.view = "STATUS";
		var df = new firemote.DeltaFactory();
		var diff = df.diff(machineRemote, machineLocal);
		scope.diffLocal = diff;
		
}]);

controllers.controller('CalibrateCtrl', ['$scope','$location', function(scope, location) {
    scope.view = "CALIBRATE";

    scope.calibrate = function () {
      alert("calibrating...");
      scope.updateStatus();
      scope.machine.gantries[0].axis.calibrate = false;
      scope.machine.trayFeeders[0].axis.calibrate = false;
      scope.machine.pcbFeeders[0].axis.calibrate = false;
    }
    scope.calibrateClass = function() {
      return scope.machine.gantries[0].axis.calibrate 
        || scope.machine.trayFeeders[0].axis.calibrate 
        || scope.machine.pcbFeeders[0].axis.calibrate
        ? "" : "hide";
    }
}]);

controllers.controller('MainCtrl', ['$scope','$location','BackgroundThread', 'machineLocal', 'machineRemote', 
  function(scope, location, BackgroundThread, machineLocal, machineRemote) {
    scope.view = "MAIN";
		scope.machine = machineLocal;
		scope.machineRemote = machineRemote;
    scope.imageLarge = false;
    scope.control = location.path() || "/status";
    scope.axes = scope.machine.axes();
    scope.isActive = [];

    scope.camImageClick = function() {
      scope.imageLarge = !scope.imageLarge;
    }
    scope.camImageHeight = function() {
      return scope.imageLarge ? "100%" : "65px";
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
    scope.hsliderChange = function() {
      for (var i = 0; i < scope.axes.length; i++) {
        scope.axes[i].posNew = scope.axes[i].pos;
      }
			scope.postMachineState();
    }
    scope.hsliderNumberClass = function() {
      return scope.machine.gantries[0].head.light ? "hslider-number hslider-number-light": "hslider-number";
    }
    scope.hsliderSpindleClass = function(spindle) {
      var result = "spindle spindle-" + spindle.side;

      result += spindle.on ? " spindle-on" : "";
      result += spindle.pos == 0 ? " spindle-down" : "";
      result += spindle.part ? " spindle-loaded" : "";

      return result;
    }
    scope.viewControl = function(control) {
      location.path(control);
      scope.control = control;
    }
    scope.onMachineStateReceived = function(remoteMachineState) {
			try {
				var newMachineRemote = new firemote.MachineState(remoteMachineState);
				var df = new firemote.DeltaFactory();
				scope.diffRemote = df.diff(scope.machineRemote, newMachineRemote);
				scope.diffLocal = df.diff(scope.machineRemote, scope.machine);
				scope.updated = new Date().toLocaleTimeString();
				df.applyDiff(scope.diffRemote, scope.machineRemote);
				df.applyDiff(scope.diffRemote, scope.machine);
				df.applyDiff(scope.diffLocal, scope.machine);
			} catch (e) {
				alert("onMachineStateReceived()\n" + e);
			}
    };
    scope.postMachineState = function() {
			scope.machine.stateId = scope.machineRemote.stateId + 1;
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
