///<reference path='../../include.d.ts'/>
var firemote;
(function (firemote) {
    var Part = (function () {
        function Part(obj) {
            this.name = "0 ohm resistor";
            this.pcbId = "R0";
            if (typeof obj === 'string') {
                obj = JSON.parse(obj);
            }
            if (typeof obj !== 'undefined') {
                this.name = obj.name || this.name;
                this.pcbId = obj.pcbId || this.pcbId;
            }
        }
        Part.prototype.clone = function () {
            return new Part(this);
        };
        return Part;
    })();
    firemote.Part = Part;
})(firemote || (firemote = {}));

exports.Part = firemote.Part;
///<reference path='../../include.d.ts'/>
var firemote;
(function (firemote) {
    var Spindle = (function () {
        function Spindle(obj) {
            if (typeof obj === "undefined") { obj = undefined; }
            this.name = "Spindle";
            this.on = false;
            this.pos = 100;
            if (typeof obj === 'string') {
                obj = JSON.parse(obj);
            }
            if (typeof obj !== 'undefined') {
                if (obj.hasOwnProperty("name"))
                    this.name = obj.name;
                if (obj.hasOwnProperty("on"))
                    this.on = obj.on;
                if (obj.hasOwnProperty("pos"))
                    this.pos = obj.pos;
                if (obj.hasOwnProperty("part"))
                    this.part = obj.part.clone();
            }
        }
        Spindle.prototype.clone = function () {
            return new Spindle(this);
        };
        return Spindle;
    })();
    firemote.Spindle = Spindle;
})(firemote || (firemote = {}));

exports.Spindle = firemote.Spindle;
///<reference path='../../include.d.ts'/>
var firemote;
(function (firemote) {
    var TrayFeeder = (function () {
        function TrayFeeder(obj) {
            if (typeof obj === "undefined") { obj = undefined; }
            this.name = "Tray Feeder";
            if (typeof obj === 'string') {
                obj = JSON.parse(obj);
            }
            if (typeof obj !== 'undefined') {
                if (obj.hasOwnProperty("name"))
                    this.name = obj.name;
                if (obj.hasOwnProperty("axis"))
                    this.axis = new firemote.Axis(obj.axis);
            }
            this.axis = this.axis || new firemote.Axis({ name: this.name });
        }
        TrayFeeder.prototype.clone = function () {
            return new TrayFeeder(this);
        };
        return TrayFeeder;
    })();
    firemote.TrayFeeder = TrayFeeder;
})(firemote || (firemote = {}));

exports.TrayFeeder = firemote.TrayFeeder;
///<reference path='../../include.d.ts'/>
var firemote;
(function (firemote) {
    var PcbFeeder = (function () {
        function PcbFeeder(obj) {
            if (typeof obj === "undefined") { obj = undefined; }
            this.name = "PCB Feeder";
            if (typeof obj === 'string') {
                obj = JSON.parse(obj);
            }
            if (typeof obj !== 'undefined') {
                if (obj.hasOwnProperty("name"))
                    this.name = obj.name;
                if (obj.hasOwnProperty("axis"))
                    this.axis = new firemote.Axis(obj.axis);
            }
            this.axis = this.axis || new firemote.Axis({ name: this.name });
        }
        PcbFeeder.prototype.clone = function () {
            return new PcbFeeder(this);
        };
        return PcbFeeder;
    })();
    firemote.PcbFeeder = PcbFeeder;
})(firemote || (firemote = {}));

exports.PcbFeeder = firemote.PcbFeeder;
///<reference path='../../include.d.ts'/>
var firemote;
(function (firemote) {
    var Gantry = (function () {
        function Gantry(obj) {
            if (typeof obj === "undefined") { obj = undefined; }
            if (typeof obj === 'string') {
                obj = JSON.parse(obj);
            }
            if (typeof obj !== 'undefined') {
                if (obj.hasOwnProperty("name"))
                    this.name = obj.name;
                if (obj.hasOwnProperty("head"))
                    this.head = new firemote.Head(obj.head);
                if (obj.hasOwnProperty("axis"))
                    this.axis = new firemote.Axis(obj.axis);
            }
            this.name = this.name || "Gantry";
            this.axis = this.axis || new firemote.Axis({ name: this.name });
            this.head = this.head || new firemote.Head({ name: this.name });
        }
        Gantry.prototype.clone = function () {
            return new Gantry(this);
        };
        return Gantry;
    })();
    firemote.Gantry = Gantry;
})(firemote || (firemote = {}));

exports.Gantry = firemote.Gantry;
///<reference path='../../include.d.ts'/>
var firemote;
(function (firemote) {
    var Head = (function () {
        function Head(obj) {
            if (typeof obj === "undefined") { obj = undefined; }
            this.spindles = [];
            this.angle = 0;
            if (typeof obj === 'string') {
                obj = JSON.parse(obj);
            }
            if (typeof obj !== 'undefined') {
                if (obj.hasOwnProperty("angle"))
                    this.angle = obj.angle;
                if (obj.spindles && obj.spindles.length > 0) {
                    for (var i = 0; i < obj.spindles.length; i++) {
                        this.spindles.push(new firemote.Spindle(obj.spindles[i]));
                    }
                }
            }
            this.spindles.length > 0 || this.spindles.push(new firemote.Spindle({ name: "Left" }));
        }
        Head.prototype.clone = function () {
            return new Head(this);
        };
        return Head;
    })();
    firemote.Head = Head;
})(firemote || (firemote = {}));

exports.Head = firemote.Head;
///<reference path='../../include.d.ts'/>
var firemote;
(function (firemote) {
    var MachineState = (function () {
        function MachineState(obj) {
            if (typeof obj === "undefined") { obj = undefined; }
            this.message = "FirePick machine state";
            this.stateId = 1;
            this.logLevel = "INFO";
            this.firefuse = true;
            this.gantries = [];
            this.trayFeeders = [];
            this.pcbFeeders = [];
            if (typeof obj === 'string') {
                obj = JSON.parse(obj);
            }
            if (typeof obj !== 'undefined') {
                if (obj.hasOwnProperty("message"))
                    this.message = obj.message;
                if (obj.hasOwnProperty("stateId"))
                    this.stateId = obj.stateId;
                if (obj.hasOwnProperty("logLevel"))
                    this.logLevel = obj.logLevel;
                if (obj.hasOwnProperty("firefuse"))
                    this.firefuse = obj.firefuse;
                if (obj.gantries && obj.gantries.length > 0) {
                    for (var i = 0; i < obj.gantries.length; i++) {
                        this.gantries.push(new firemote.Gantry(obj.gantries[i]));
                    }
                }
                if (obj.trayFeeders && obj.trayFeeders.length > 0) {
                    for (var i = 0; i < obj.trayFeeders.length; i++) {
                        this.trayFeeders.push(new firemote.TrayFeeder(obj.trayFeeders[i]));
                    }
                }
                if (obj.pcbFeeders && obj.pcbFeeders.length > 0) {
                    for (var i = 0; i < obj.pcbFeeders.length; i++) {
                        this.pcbFeeders.push(new firemote.PcbFeeder(obj.pcbFeeders[i]));
                    }
                }
            }
            this.gantries.length > 0 || this.gantries.push(new firemote.Gantry());
            this.trayFeeders.length > 0 || this.trayFeeders.push(new firemote.TrayFeeder());
            this.pcbFeeders.length > 0 || this.pcbFeeders.push(new firemote.PcbFeeder());
        }
        MachineState.prototype.clone = function () {
            return new MachineState(this);
        };
        return MachineState;
    })();
    firemote.MachineState = MachineState;
})(firemote || (firemote = {}));

exports.MachineState = firemote.MachineState;
///<reference path='../../include.d.ts'/>
var firemote;
(function (firemote) {
    var Axis = (function () {
        function Axis(obj) {
            if (typeof obj === "undefined") { obj = undefined; }
            this.name = "Unknown axis";
            this.pos = 0;
            this.posMax = 100;
            this.jog = 1;
            this.calibrate = false;
            if (typeof obj === 'string') {
                obj = JSON.parse(obj);
            }
            if (typeof obj !== 'undefined') {
                if (obj.hasOwnProperty("name"))
                    this.name = obj.name;
                if (obj.hasOwnProperty("pos"))
                    this.pos = obj.pos;
                if (obj.hasOwnProperty("posMax"))
                    this.posMax = obj.posMax;
                if (obj.hasOwnProperty("jog"))
                    this.jog = obj.jog;
                if (obj.hasOwnProperty("calibrate"))
                    this.calibrate = obj.calibrate;
            }
        }
        Axis.prototype.clone = function () {
            return new Axis(this);
        };
        return Axis;
    })();
    firemote.Axis = Axis;
})(firemote || (firemote = {}));

exports.Axis = firemote.Axis;
