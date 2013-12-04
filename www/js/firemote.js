///<reference path='../../include.d.ts'/>
var firemote;
(function (firemote) {
    var DeltaFactory = (function () {
        function DeltaFactory(obj) {
        }
        DeltaFactory.prototype.clone = function () {
            return new DeltaFactory(this);
        };

        DeltaFactory.prototype.equals = function (obj1, obj2) {
            return this.diff(obj1, obj2) ? false : true;
        };

        DeltaFactory.prototype.applyDiff = function (diff, obj) {
            if (diff instanceof Array) {
                this.applyArrayDiff(diff, obj);
            } else if (diff) {
                for (var k in diff) {
                    var val = diff[k];
                    if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
                        obj[k] = val;
                    } else if (typeof obj[k] === 'undefined') {
                        obj[k] = val;
                    } else {
                        this.applyDiff(val, obj[k]);
                    }
                }
            }
            return obj;
        };

        DeltaFactory.prototype.applyArrayDiff = function (diff, arr) {
            for (var i = 0; i < arr.length; i++) {
                var val = diff[i];
                if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
                    arr[i] = val;
                } else {
                    this.applyDiff(val, arr[i]);
                }
            }
        };

        DeltaFactory.prototype.diff = function (obj1, obj2) {
            var result = {};
            var changes = 0;
            if (typeof obj1 === 'undefined')
                return "diff(undefined,...)";
            if (typeof obj2 === 'undefined')
                return "diff(obj,undefined)";
            if (typeof obj1 !== typeof obj2)
                return "diff(type != type)";
            if (obj1 instanceof Array) {
                return this.diffArray(obj1, obj2);
            }
            for (var k in obj1) {
                if (k === '$$hashKey')
                    continue;

                var val1 = obj1[k];
                var val2 = obj2[k];
                if (typeof val1 === 'function' || typeof val2 === 'function') {
                    // ignore functions
                } else if (typeof val1 !== typeof val2) {
                    result[k] = val2;
                    changes++;
                } else if (val1 instanceof Array) {
                    var arrDiff = this.diffArray(val1, val2);
                    if (arrDiff) {
                        result[k] = arrDiff;
                        changes++;
                    }
                } else {
                    if (val1 !== val2) {
                        if (typeof val1 === 'number' || typeof val1 === 'string' || typeof val1 === 'boolean') {
                            result[k] = val2;
                            changes++;
                        } else {
                            var diffVal = this.diff(val1, val2);
                            if (diffVal) {
                                result[k] = diffVal;
                                changes++;
                            }
                        }
                    }
                }
            }
            for (var k in obj2) {
                if (k === '$$hashKey')
                    continue;
                var val1 = obj1[k];
                var val2 = obj2[k];
                if (typeof val1 === 'undefined') {
                    result[k] = val2;
                    changes++;
                }
            }
            return changes > 0 ? result : false;
        };

        DeltaFactory.prototype.diffArray = function (arr1, arr2) {
            var result = [];
            var changes = 0;
            for (var i = 0; i < arr1.length; i++) {
                var val1 = arr1[i];
                var val2 = arr2[i];
                if (typeof val1 !== typeof val2) {
                    changes++;
                    result.push(diffResult);
                } else if (val1 === val2) {
                    result.push(undefined);
                } else if (typeof val1 === 'number' || typeof val1 === 'string') {
                    changes++;
                    result.push(val2);
                } else {
                    var diffResult = this.diff(val1, val2);
                    if (diffResult) {
                        changes++;
                        result.push(diffResult);
                    } else {
                        result.push(undefined);
                    }
                }
            }
            if (changes === 0) {
                return false;
            }
            return result;
        };
        return DeltaFactory;
    })();
    firemote.DeltaFactory = DeltaFactory;
})(firemote || (firemote = {}));

exports.DeltaFactory = firemote.DeltaFactory;
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
            if (typeof obj === 'string') {
                obj = JSON.parse(obj);
            }
            if (typeof obj !== 'undefined') {
                if (obj.hasOwnProperty("axis"))
                    this.axis = new firemote.Axis(obj.axis);
            }
            this.axis = this.axis || new firemote.Axis({ name: "Tray Feeder" });
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
            if (typeof obj === 'string') {
                obj = JSON.parse(obj);
            }
            if (typeof obj !== 'undefined') {
                if (obj.hasOwnProperty("axis"))
                    this.axis = new firemote.Axis(obj.axis);
            }
            this.axis = this.axis || new firemote.Axis({ name: "PCB Feeder" });
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
                if (obj.hasOwnProperty("head"))
                    this.head = new firemote.Head(obj.head);
                if (obj.hasOwnProperty("axis"))
                    this.axis = new firemote.Axis(obj.axis);
            }
            this.axis = this.axis || new firemote.Axis({ name: "Gantry" });
            this.head = this.head || new firemote.Head();
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
            this.light = true;
            if (typeof obj === 'string') {
                obj = JSON.parse(obj);
            }
            if (typeof obj !== 'undefined') {
                if (obj.hasOwnProperty("angle"))
                    this.angle = obj.angle;
                if (obj.hasOwnProperty("light"))
                    this.light = obj.light;
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
    var FireStep = (function () {
        //mpob: number = 0; // [mpob] b machine position
        //mpoc: number = 0; // [mpoc] c machine position
        //ofsx: number = 0; // [ofsx] x machine offset   - X machine offset to work position in absolute coordinates in mm units ONLY
        //ofsy: number = 0; // [ofsy] y machine offset       Reports offsets in mm and absolute machine coordinates
        //ofsz: number = 0; // [ofsz] z machine offset
        //ofsa: number = 0; // [ofsa] a machine offset
        //ofsb: number = 0; // [ofsb] b machine offset
        //ofsc: number = 0; // [ofsc] c machine offset
        //g54x: number = 0; // [g54x] g54x               - G54 coordinate system offset for X axis
        //g54y: number = 0; // [g54y] g54y                   Coordinate system offsets may be reported
        //g54z: number = 0; // [g54z] g54z
        //...
        //g59a: number = 0; // [g59a] g59a
        //g59b: number = 0; // [g59b] g59b
        //g59c: number = 0; // [g59c] g59c
        //g92x: number = 0; // [g92x] g92x               - G92 origin offset for X axis
        //g92y: number = 0; // [g92y] g92y                   The number returned can be a bit brain bending as you have to back out
        //g92z: number = 0; // [g92z] g92z                   the position from which the G92 was set, but this is the actual offset
        //g29a: number = 0; // [g29a] g92a                   value; and may be different from the value entered in the G92 command.
        //g92b: number = 0; // [g92b] g92b
        //g92c: number = 0; // [g92c] g92c
        function FireStep(obj) {
            if (typeof obj === "undefined") { obj = undefined; }
            this.vel = 0;
            this.feed = 0;
            this.stat = 0;
            //unit: number = 0; // [unit] units_mode         - 0=inch, 1=mm
            this.coor = 0;
            this.momo = 0;
            //plan: number = 0; // [plan] plane_select       - 0=XY plane, 1=XZ plane, 2=YZ plane
            this.path = 0;
            this.dist = 0;
            //frmo: number = 0; // [frmo] feed_rate_mode     - 0=units-per-minute-mode, 1=inverse-time-mode
            this.hold = 0;
            this.posx = 0;
            this.posy = 0;
            this.posz = 0;
            this.posa = 0;
            //posb: number = 0; // [posb] b work position
            //posc: number = 0; // [posc] c work position
            this.mpox = 0;
            this.mpoy = 0;
            this.mpoz = 0;
            this.mpoa = 0;
            if (typeof obj === 'string') {
                obj = JSON.parse(obj);
            }
            if (typeof obj !== 'undefined') {
                for (var k in this) {
                    if (typeof this[k] === 'number') {
                        this[k] = obj[k];
                    }
                }
            }
        }
        FireStep.prototype.clone = function () {
            return new FireStep(this);
        };
        return FireStep;
    })();
    firemote.FireStep = FireStep;
})(firemote || (firemote = {}));

exports.FireStep = firemote.FireStep;
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
            this.firestep = new firemote.FireStep();
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
                if (obj.hasOwnProperty("firestep"))
                    this.firestep = obj.firestep;
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
        MachineState.prototype.clearForLinearMotion = function () {
            for (var i = 0; i < this.gantries.length; i++) {
                var spindles = this.gantries[i].head.spindles;
                for (var j = 0; j < spindles.length; j++) {
                    spindles[j].pos = 100;
                }
            }
        };

        MachineState.prototype.axes = function () {
            var result = [];

            for (var i = 0; i < this.gantries.length; i++) {
                result.push(this.gantries[i].axis);
            }
            for (var i = 0; i < this.pcbFeeders.length; i++) {
                result.push(this.pcbFeeders[i].axis);
            }
            for (var i = 0; i < this.trayFeeders.length; i++) {
                result.push(this.trayFeeders[i].axis);
            }

            return result;
        };

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
                    this.pos = obj.pos * 1;
                if (obj.hasOwnProperty("posMax"))
                    this.posMax = obj.posMax * 1;
                if (obj.hasOwnProperty("jog"))
                    this.jog = obj.jog * 1;
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
