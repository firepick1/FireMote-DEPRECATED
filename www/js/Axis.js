var org;
(function (org) {
    (function (firepick) {
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
                        obj.name && (this.name = obj.name);
                        obj.pos && (this.pos = obj.pos);
                        obj.posMax && (this.posMax = obj.posMax);
                        obj.jog && (this.jog = obj.jog);
                        obj.calibrate && (this.calibrate = obj.calibrate);
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
