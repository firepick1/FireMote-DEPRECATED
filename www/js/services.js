/*
services.js https://github.com/firepick1/FireMote/wiki

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

var services = angular.module('FireMote.services', []);

services.value('version', '0.1');
services.value('machineLocal', new firemote.MachineState());
services.value('machineRemote', new firemote.MachineState());

services.factory('BackgroundThread', ['$http', '$interval', 'machineRemote', 'machineLocal',
		function($http, $interval, machineRemote, machineLocal){
	var animation = ['\u25cb', '\u25d4', '\u25d1', '\u25d5', '\u25cf'];
  var backgroundThread = {
		onMachineStateReceived: function(state){},
		t:0,
		get: function(callback){
			$http.get("firemote/state")
				.success(function(data) {
					callback(data);
				})
				.error(function(data, status, headers, config) {
					alert("Could not get status");
				});
		},
		postMachineStateDiff: function(diff, callback) {
			var json = JSON.stringify(diff);
			$http.post("firemote/state", json)
				.success(function(data) {
					callback(data);
				})
				.error(function(data, status, headers, config) {
					alert("Could not get status");
				});
		}
	};

	var promise = $interval(function(seconds) {
		var df = new firemote.DeltaFactory();

		$http.get("firemote/state")
			.success(function(data) {
				backgroundThread.t++;
				backgroundThread.onMachineStateReceived(data);
			})
			.error(function(data, status, headers, config) {
				var msg = JSON.stringify({error:"firemote/state GET failed. Server may be unavailable. Refresh page.",data:data,status:status});
				console.log(msg);
				machineLocal.message = msg;
				$interval.cancel(promise);
			})

		}, 1000);

	return backgroundThread;
}]);

