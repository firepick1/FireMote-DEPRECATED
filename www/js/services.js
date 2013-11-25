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

services.factory('REST', [function() {
		var isMock = false;
		return {
			getStatePOSTUrl: function() {
					return isMock ? "firemote/echo" : "firemote/state";
			},
			getStateGETUrl: function() {
					return isMock ? "firemote/state" : "firemote/state";
			},
			getMock: function(value) {
				return isMock;
			},
			setMock: function(value) {
				isMock = value;
			}
		};
}]);

services.factory('FireMote', ['$http', '$interval', 'REST', function($http, $interval, rest){
	var animation = ['\u25cb', '\u25d4', '\u25d1', '\u25d5', '\u25cf'];
	//var animation = ['\u2665', '\u2764'];
	//var animation = ['\u2190', '\u2196', '\u2191', '\u2197', '\u2192', '\u2198', '\u2193', '\u2199'];
  var firemote = {
		onFireStep: function(firestep) {},
		firestep: {"firestep":"...", "seconds":null},
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
		post: function(postData, callback) {
			var json = JSON.stringify(postData);
			$http.post(rest.getStatePOSTUrl(), json)
				.success(function(data) {
					callback(data);
				})
				.error(function(data, status, headers, config) {
					alert("Could not get status");
				});
		}
	};

	$interval(function(seconds) {
		$http.get("firemote/firestep")
			.success(function(data) {
				firemote.firestep = data;
				firemote.firestep.t = animation[seconds % animation.length];
				firemote.onFireStep(firemote.firestep);
				firemote.t++;
			})
			.error(function(data, status, headers, config) {
				firemote.firestep = {error:"could not get firemote/state",data:data,status:status};
				firemote.firestep.t = animation[seconds % animation.length];
			})

		}, 1000);

	return firemote;
}]);

