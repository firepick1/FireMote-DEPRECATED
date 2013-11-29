var org;
(function (org) {
    (function (firepick) {
        ///<reference path='../../include.d.ts'/>
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
        })(firepick.firemote || (firepick.firemote = {}));
        var firemote = firepick.firemote;
    })(org.firepick || (org.firepick = {}));
    var firepick = org.firepick;
})(org || (org = {}));

exports.Axis = org.firepick.firemote.Axis;
