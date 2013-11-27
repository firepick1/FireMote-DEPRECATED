var org;
(function (org) {
    (function (firepick) {
        (function (firemote) {
            var Gantry = (function () {
                function Gantry(obj) {
                    if (typeof obj === "undefined") { obj = undefined; }
                    if (typeof obj === 'string') {
                        obj = JSON.parse(obj);
                    }
                    if (typeof obj !== 'undefined') {
                        obj.name && (this.name = obj.name);
                        obj.head && (this.head = new firemote.Head(obj.head));
                        obj.axis && (this.axis = new firemote.Axis(obj.axis));
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
        })(firepick.firemote || (firepick.firemote = {}));
        var firemote = firepick.firemote;
    })(org.firepick || (org.firepick = {}));
    var firepick = org.firepick;
})(org || (org = {}));
