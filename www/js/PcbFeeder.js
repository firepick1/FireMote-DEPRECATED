var org;
(function (org) {
    (function (firepick) {
        ///<reference path='../../include.d.ts'/>
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
        })(firepick.firemote || (firepick.firemote = {}));
        var firemote = firepick.firemote;
    })(org.firepick || (org.firepick = {}));
    var firepick = org.firepick;
})(org || (org = {}));

exports.PcbFeeder = org.firepick.firemote.PcbFeeder;
