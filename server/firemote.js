var express = require('express');
var fs = require('fs');
var app = express();

var dummy = {
	firestep:{mpox:411, mpoy:411, mpoz:411, vel:411, state:411},
	logLevel: "INFO",
	demo:false,
	state:{
		stateId:0,
		head:{"angle":0,"light":true},
		trayFeeder:{"name":"Tray Feeder", "pos":0, "posMax":300, "calibrate":false, "jog":1},
		pcbFeeder:{"name":"PCB Feeder", "pos":0, "posMax":300, "calibrate":false, "jog":1},
		gantry: {"name":"Gantry", "pos":0, "posMax":500, "jog":1},
		spindleLeft:{"pos":0, "name":"Left", "side":"left", "on":true, "part":true},
		spindleRight:{"pos":100, "name":"Right", "side":"right", "on":false, "part":false},
		message:"FireMote is in demo mode"
		}
};

//var machine = dummy;
var __appdir = "www";
var tsr = require('typescript-require');
var firemote = require('../www/js/firemote.js');
var machine = new firemote.MachineState();

app.use(express.static(__appdir));
app.use(express.bodyParser());

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
	if (machine.demo) {
		machine.firestep.mpox = machine.trayFeeders[0].axis.pos;
		machine.firestep.mpoy = machine.gantries[0].axis.pos;
		machine.firestep.mpoz = machine.pcbFeeders[0].axis.pos;
	} else {
		var filename = '/dev/firefuse/firestep';
		fs.readFile(filename, function (err, data) {
			if (err)  {
				machine.demo = true;
				console.log("FireFuse is unavailable. machine is now in demo mode.");
			} else {
				machine.firestep = data;
			}
		});
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
  if (machine.demo) {
    res.sendfile(__appdir + '/data/firefuse.log');
	} else {
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
  }
});

app.get('/firemote/headcam.jpg', function(req, res){
  res.setHeader('Content-Type', 'image/jpeg');
	if (machine.demo) {
    res.sendfile(__appdir + '/img/camcv0.jpg');
	} else {
    res.sendfile('/dev/firefuse/cam.jpg');
  }
});

app.get('/firemote/state', function(req, res){
	firemote_respondJSON(res, machine.state);
});

app.post('/firemote/state', function(req, res){
	machine.state = req.body;
	machine.state.stateId = machine.stateId++;
	machine.state.message = "FireMote POST state response";
	console.log("POST(/firemote/state) -> " + JSON.stringify(machine.state));
	firemote_respondJSON(res, machine.state);
});

app.listen(8000);
console.log('FireMote listening on port 8000');

console.log("FIREMOTE");
for (var k in firemote) {
	 console.log(k);
}
