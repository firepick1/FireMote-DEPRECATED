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
			getStatusUrl: function() {
					return isMock ? "data/status.json" : "data/statusLive.json";
			},
			getMock: function(value) {
				return isMock;
			},
			setMock: function(value) {
				isMock = value;
			}
		};
}]);

services.factory('Status', ['$http', 'REST', function($http, rest){
	return{
		get: function(callback){
			$http.get(rest.getStatusUrl())
				.success(function(data) {
					callback(data);
				})
				.error(function(data, status, headers, config) {
					alert("Could not get status");
				});
		}
	};
}]);

