/*
firemote.js https://github.com/firepick1/FirePick/wiki

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

var fs = require('fs');
var http = require('http');
var url = require('url');

http.createServer(function(req,resp) {
	var parseUrl = url.parse(req.url, true);

	if (parseUrl.pathname === "/camera") {
		var fileName = "/dev/firefuse/cam.jpg";
		fs.readFile(fileName, function(error, data) {
			if (error) throw error;
			resp.writeHead(200, {"Content-Type": "image/jpeg"});
			resp.write(data);
		});
	} else {
		resp.writeHead(200, {"Content-Type": "text/plain"});
		resp.writeln("Path unknown");
		resp.writeln(parseUrl.pathname);
	}
	resp.end();
	console.log(parseUrl.href);

}).listen(8080);
