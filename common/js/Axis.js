var org;
(function (org) {
    (function (firepick) {
        (function (firemote) {
            var Axis = (function () {
                function Axis(name_, posMax_) {
                    if (typeof name_ === "undefined") { name_ = "Unknown Axis"; }
                    if (typeof posMax_ === "undefined") { posMax_ = 100; }
                    this.name_ = name_;
                    this.posMax_ = posMax_;
                    this.pos = 0;
                    this.jog = 1;
                    this.calibrate = false;
                    this.name = name_;
                    this.posMax = posMax_;
                }
                Axis.prototype.clone = function () {
                    var result = new Axis(this.name, this.posMax);
                    result.pos = this.pos;
                    result.jog = this.jog;
                    result.calibrate = this.calibrate;
                    return result;
                };

                Axis.cloneArray = function (value) {
                    var result = [];
                    for (var i = 0; i < value.length; i++) {
                        var axis = value[i];
                        result.push(axis.clone());
                    }
                    return result;
                };
                return Axis;
            })();
            firemote.Axis = Axis;
        })(firepick.firemote || (firepick.firemote = {}));
        var firemote = firepick.firemote;
    })(org.firepick || (org.firepick = {}));
    var firepick = org.firepick;
})(org || (org = {}));
