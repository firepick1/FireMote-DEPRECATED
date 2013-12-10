var express = require('express');
var fs = require('fs');
var app = express();
var __appdir = "www";
app.use(express.static(__appdir));
app.use(express.bodyParser());

var tsr = require('typescript-require');
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
	if (diff.stateId === machine.stateId + 1) {
		var oldMachine = new firemote.MachineState(machine);
		var isMove = false;
	  deltaFactory.applyDiff(diff, machine);
		machine.validate();
		var newAxes = machine.linearAxes();
		for (var i = 0; i < newAxes.length; i++) {
		  var axis = newAxes[i];
			if (axis.calibrate === 'home') {
			  axis.pos = 0;
				console.log("calibrating " + axis.name);
				axis.calibrate = false;
			}
		}
		var oldAxes = oldMachine.linearAxes();
		var axesDiff = deltaFactory.diff(newAxes, oldAxes);
		if (axesDiff) {
		  console.log("/firemote/state clearForLinearMotion " + JSON.stringify(axesDiff));
		  machine.clearForLinearMotion();
			var gcode = oldMachine.linearMotionGCode(machine);
			console.log(gcode);
			if (machine.firefuse) {
				var filename = '/dev/firefuse/firestep';
				var err = fs.writeFileSync('/dev/firefuse/firestep', gcode);
				if (err) return console.log(err);
			}
		}
		machine.message = "FireMote POST state response";
		console.log("POST(/firemote/state) -> " + JSON.stringify(diff));
		fs.writeFile('server/machine.json', JSON.stringify(machine), function (err) {
			if (err) return console.log(err);
		});
	} else {
		machine.message = "Invalid stateId actual:" + diff.stateId + " expected:" + (machine.stateId+1);
		console.log(machine.message);
	  console.log("POST(/firemote/state) -REJECTED->" + JSON.stringify(diff));
	}
	firemote_respondJSON(res, machine);
});

app.listen(8000);
console.log('FireMote listening on port 8000');

console.log("FIREMOTE");
for (var k in firemote) {
	 console.log(k);
}

var foo= [1,'a'];
var fun = function(){return 1;}
console.log("Array typeof is " + (typeof foo));
console.log("instanceof Array " + (foo instanceof Array));
console.log("typeof function " + (typeof fun));
console.log("typeof true " + (typeof true));
