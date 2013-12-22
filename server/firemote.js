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
console.log("loading express...");
var express = require('express');
var fs = require('fs');
var app = express();
var __appdir = "www";
app.use(express.static(__appdir));
app.use(express.bodyParser());

console.log("loading typescript-require...");
var tsr = require('typescript-require');
console.log("loading firemote.js...");
var firemote = require('../www/js/firemote.js');
var machine;
var deltaFactory = new firemote.DeltaFactory();

firemote_respondJSON = function(res, obj) {
	if (typeof obj === 'undefined') {
		obj = "undefined";
	}
	var json = JSON.stringify(obj);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', json.length);
  res.end(json);
};

firestep_load = function() {
	if (typeof machine === 'undefined') {
		try {
			var data = fs.readFileSync("server/machine.json", 'utf-8');
			console.log("Loading saved MachineState: ", data);
			machine = new firemote.MachineState(JSON.parse(data));
	  } catch (e) {
			console.log("Creating default MachineState");
			machine = new firemote.MachineState();
		}
	}
	if (machine.firefuse) {
		var filename = '/dev/firefuse/firestep';
		fs.readFile(filename, function (err, data) {
			if (err)  {
				machine.firefuse = false;
				console.log("FireFuse is unavailable. machine is now in demo mode.");
			} else {
				machine.firestep = data;
			}
		});
	} else {
		machine.firestep.mpox = machine.trayFeeders[0].axis.pos;
		machine.firestep.mpoy = machine.gantries[0].axis.pos;
		machine.firestep.mpoz = machine.pcbFeeders[0].axis.pos;
	}
}
firestep_load();


app.put('/firemote/firestep', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var filename = '/dev/firefuse/firestep';
	firemote_respondJSON(res, machine.firestep);
	firestep_load();
});

app.get('/firemote/firestep', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var filename = '/dev/firefuse/firestep';
	firemote_respondJSON(res, machine.firestep);
	firestep_load();
});

app.get('/firemote/log', function(req, res){
  res.setHeader('Content-Type', 'text/plain');
  var filename = '/var/log/firefuse.log';
  if (machine.firefuse) {
    var err = undefined;
    if (machine.logLevel !== req.query.level) {
      machine.logLevel = req.query.level;
      err = fs.writeFileSync('/dev/firefuse/firelog', machine.logLevel);
    }
    if (err) {
      res.send("Error: " + err);
    } else {
      res.sendfile(filename);
    }
	} else {
    res.sendfile(__appdir + '/data/firefuse.log');
  }
});

app.get('/firemote/headcam.jpg', function(req, res){
  res.setHeader('Content-Type', 'image/jpeg');
	if (machine.firefuse) {
    res.sendfile('/dev/firefuse/cam.jpg');
	} else {
    res.sendfile(__appdir + '/img/camcv0.jpg');
  }
});

app.get('/firemote/state', function(req, res){
	firemote_respondJSON(res, machine);
});


app.post('/firemote/state', function(req, res){
	var diff = req.body;
	var msg = "FireMote POST state response";
	if (diff.stateId === machine.stateId + 1) {
		var firestepWriter = function(gcode){ 
			console.log("GCoder:" + gcode); 
		  machine.clearForLinearMotion();
			machine.gcode = gcode;
			if (machine.firefuse) {
				var filename = '/dev/firefuse/firestep';
				var err = fs.writeFileSync('/dev/firefuse/firestep', gcode + "\n");
				if (err) {
					msg = JSON.stringify(err);
				  console.log(msg);
				}
			}
		};
		var gc = new firemote.GCoder(firestepWriter);
		machine.moveTo(diff, gc);
	  deltaFactory.applyDiff(diff, machine);
		machine.validate();
		machine.calibrate(gc);
		console.log("POST(/firemote/state) <- " + JSON.stringify(diff));
		var machineStr = JSON.stringify(machine);
		//console.log(machineStr);
		fs.writeFile('server/machine.json', machineStr, function (err) {
			if (err) return console.log(err);
		});
	} else {
		msg = "Invalid stateId actual:" + diff.stateId + " expected:" + (machine.stateId+1);
		console.log(msg);
	  console.log("POST(/firemote/state) -REJECTED->" + JSON.stringify(diff));
	}
	machine.message = msg;
	firemote_respondJSON(res, machine);
});

var firemote_port = process.env.FIREMOTE_PORT || 8000;
app.listen(firemote_port);
console.log('FireMote listening on port ' + firemote_port);
