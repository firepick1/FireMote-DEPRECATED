var org;
(function (org) {
    (function (firepick) {
        (function (firemote) {
            var TrayFeeder = (function () {
                function TrayFeeder(obj) {
                    if (typeof obj === "undefined") { obj = undefined; }
                    this.name = "Tray Feeder";
                    if (typeof obj === 'string') {
                        obj = JSON.parse(obj);
                    }
                    if (typeof obj !== 'undefined') {
                        obj.name && (this.name = obj.name);
                        obj.axis && (this.axis = new firemote.Axis(obj.axis));
                    }
                    this.axis = this.axis || new firemote.Axis({ name: this.name });
                }
                TrayFeeder.prototype.clone = function () {
                    return new TrayFeeder(this);
                };
                return TrayFeeder;
            })();
            firemote.TrayFeeder = TrayFeeder;
        })(firepick.firemote || (firepick.firemote = {}));
        var firemote = firepick.firemote;
    })(org.firepick || (org.firepick = {}));
    var firepick = org.firepick;
})(org || (org = {}));
