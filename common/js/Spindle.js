var Part = org.firepick.firemote.Part;

var org;
(function (org) {
    (function (firepick) {
        (function (firemote) {
            var Spindle = (function () {
                function Spindle(name_) {
                    if (typeof name_ === "undefined") { name_ = "Left"; }
                    this.name_ = name_;
                    this.on = false;
                    this.pos = 100;
                    this.name = name_;
                }
                Spindle.prototype.clone = function () {
                    var result = new Spindle(this.name);
                    result.on = this.on;
                    result.part = this.part;
                    result.pos = this.pos;
                    return result;
                };
                return Spindle;
            })();
            firemote.Spindle = Spindle;
        })(firepick.firemote || (firepick.firemote = {}));
        var firemote = firepick.firemote;
    })(org.firepick || (org.firepick = {}));
    var firepick = org.firepick;
})(org || (org = {}));
