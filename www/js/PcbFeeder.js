var org;
(function (org) {
    (function (firepick) {
        (function (firemote) {
            var PcbFeeder = (function () {
                function PcbFeeder(obj) {
                    if (typeof obj === "undefined") { obj = undefined; }
                    this.name = "PCB Feeder";
                    if (typeof obj === 'string') {
                        obj = JSON.parse(obj);
                    }
                    if (typeof obj !== 'undefined') {
                        obj.name && (this.name = obj.name);
                        obj.axis && (this.axis = new firemote.Axis(obj.axis));
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
