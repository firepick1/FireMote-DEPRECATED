var express = require('express');
var fs = require('fs');
var app = express();

var __appdir = "www";

var stateId = 1;
var logLevel = "INFO";

app.use(express.static(__appdir));
app.use(express.bodyParser());

app.get('/firemote/log', function(req, res){
  res.setHeader('Content-Type', 'text/plain');
  var filename = '/var/log/firefuse.log';
  if (fs.existsSync(filename)) {
    var err = undefined;
    if (logLevel !== req.query.level) {
      logLevel = req.query.level;
      err = fs.writeFileSync('/dev/firefuse/firelog', logLevel);
    }
    if (err) {
      res.write("Error: " + err);
    } else {
      res.sendfile(filename);
    }
  } else {
    res.sendfile(__appdir + '/data/firefuse.log');
  }
});

app.get('/firemote/headcam.jpg', function(req, res){
  res.setHeader('Content-Type', 'image/jpeg');
  var jpgname = '/dev/firefuse/cam.jpg';
  if (fs.existsSync(jpgname)) {
    res.sendfile(jpgname);
  } else {
    res.sendfile(__appdir + '/img/camcv0.jpg');
  }
});

app.get('/firemote/state', function(req, res){
	var obj = {
		stateId:stateId++,
		head:{"angle":0,"light":true},
		trayFeeder:{"name":"Tray Feeder", "pos":0, "posMax":300, "calibrate":false, "jog":1},
		pcbFeeder:{"name":"PCB Feeder", "pos":0, "posMax":300, "calibrate":false, "jog":1},
		gantry: {"name":"Gantry", "pos":0, "posMax":500, "jog":1},
		spindleLeft:{"pos":0, "name":"Left", "side":"left", "on":true, "part":true},
		spindleRight:{"pos":100, "name":"Right", "side":"right", "on":false, "part":false},
		message:"FireMote is in demo mode"
		};
	body = JSON.stringify(obj);
	console.log(body);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.post('/firemote/state', function(req, res){
	var obj = req.body;
	obj.stateId = stateId++;
	obj.message = "FireMote POST state response";
	body = JSON.stringify(obj);
	console.log(body);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.post('/firemote/echo', function(req, res){
	var obj = req.body;
	obj.stateId = stateId++;
	obj.message = "FireMote POST echo response";
	body = JSON.stringify(obj);
	console.log(body);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.listen(8000);
console.log('FireMote listening on port 8000');

