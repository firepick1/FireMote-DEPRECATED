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
    	return "/firemote/log?level=" + scope.log.level;
    }

}]);

controllers.controller('MoveCtrl', ['$scope','$location',function(scope, location) {
    scope.view = "MOVE";

    for (var i = 0; i < scope.axes.length; i++) {
      scope.axes[i].posNew = scope.axes[i].pos;
    }

    scope.moveClick = function() {
      scope.spindleLeft.pos = 100;  
      scope.spindleRight.pos = 100;
      scope.postState();
    }

    scope.jogAxis = function(axis, delta) {
      scope.spindleLeft.pos = 100;  
      scope.spindleRight.pos = 100;
      axis.posNew = typeof axis.posNew === 'number' ? axis.posNew : parseFloat(axis.posNew);
      delta = typeof delta === 'number' ? delta : parseFloat(delta);
      axis.posNew = Math.min(axis.posMax,Math.max(0, Math.round(10.0*(axis.posNew + delta))/10.0));
      scope.postState();
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

controllers.controller('StatusCtrl', ['$scope','$location',function(scope, location) {
    scope.view = "STATUS";
}]);

controllers.controller('CalibrateCtrl', ['$scope','$location','Status', 'State', function(scope, location, Status, State) {
    scope.view = "CALIBRATE";

    scope.calibrate = function () {
      alert("calibrating...");
      scope.updateStatus();
      scope.axisGantry.calibrate = false;
      scope.axisTrayFeeder.calibrate = false;
      scope.axisPcbFeeder.calibrate = false;
    }
    scope.calibrateClass = function() {
      return scope.axisGantry.calibrate 
        || scope.axisTrayFeeder.calibrate 
        || scope.axisPcbFeeder.calibrate
        ? "" : "hide";
    }
}]);

controllers.controller('MainCtrl', ['$scope','$location','FireMote', function(scope, location, FireMote) {
    scope.view = "MAIN";
		scope.machine = new firemote.MachineState();
    scope.log = {level:"INFO"};
    scope.imageLarge = false;
    scope.head = {angle:0, light: true}; // default
    scope.axisGantry = {name:"Gantry", pos:0, posMax:624, calibrate:false, jog:1}; // default
    scope.axisTrayFeeder = {name:"Tray Feeder", pos:0, posMax:300, calibrate:false, jog:1}; // default
    scope.axisPcbFeeder = {name:"PCB Feeder", pos:0, posMax:300, calibrate:false, jog:1}; // default
    scope.spindleLeft = {pos:0, name:"Left", side:"left", on:true, part:true}; // default
    scope.spindleRight = {pos:100, name:"Right", side:"right", on:false, part:false}; // default
    scope.control = location.path() || "/status";
    scope.axes = [scope.axisGantry, scope.axisTrayFeeder, scope.axisPcbFeeder] 
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
      return (scope.axisGantry.pos * (700 - 36) / scope.axisGantry.posMax); 
    }
    scope.hsliderChange = function() {
      for (var i = 0; i < scope.axes.length; i++) {
        scope.axes[i].posNew = scope.axes[i].pos;
      }
    }
    scope.hsliderNumberClass = function() {
      return scope.head.light ? "hslider-number hslider-number-light": "hslider-number";
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
    scope.onStateReceived = function(state) {
      scope.status = state;
      scope.axisGantry = state.gantry || scope.axisGantry;
      scope.axisTrayFeeder = state.trayFeeder || scope.axisTrayFeeder;
      scope.axisPcbFeeder = state.pcbFeeder || scope.axisPcbFeeder;
      scope.head = state.head || scope.head;
      scope.spindleLeft = state.spindleLeft || scope.spindleLeft;
      scope.spindleRight = state.spindleRight || scope.spindleRight;

      scope.axes = [scope.axisGantry, scope.axisTrayFeeder, scope.axisPcbFeeder] 
    };
    scope.postState = function() {
      var state = {
        gantry:scope.axisGantry,
        trayFeeder:scope.axisTrayFeeder,
        pcbFeeder:scope.axisPcbFeeder,
        head:scope.head,
        spindleLeft:scope.spindleLeft,
        spindleRight:scope.spindleRight
      };
      state.trayFeeder.pos = state.trayFeeder.posNew;
      state.pcbFeeder.pos = state.pcbFeeder.posNew;
      state.gantry.pos = state.gantry.posNew;
      FireMote.post(state, scope.onStateReceived);
    };
    scope.updateStatus = function() {
      FireMote.get(scope.onStateReceived);
    };
		scope.firemote = FireMote;
		scope.firemote.onFireStep = function(firestep) {
			if (!(typeof firestep.mpoy === 'undefined')) {
				if (scope.axisGantry.pos === scope.axisGantry.posNew) {
					scope.state.gantry.pos = firestep.mpoy;
					scope.state.gantry.posNew = firestep.mpoyNew;
					scope.axisGantry.pos = firestep.mpoy;
					scope.axisGantry.posNew = firestep.mpoy;
				} 
		  }
		}

    scope.updateStatus();
}]);
