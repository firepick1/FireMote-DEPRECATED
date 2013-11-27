var Part = org.firepick.firemote.Part;

var org;
(function (org) {
    (function (firepick) {
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
                        obj.name && (this.name = obj.name);
                        obj.on && (this.on = obj.on);
                        obj.pos && (this.pos = obj.pos);
                        obj.part && (this.part = obj.part.clone());
                    }
                }
                Spindle.prototype.clone = function () {
                    return new Spindle(this);
                };
                return Spindle;
            })();
            firemote.Spindle = Spindle;
        })(firepick.firemote || (firepick.firemote = {}));
        var firemote = firepick.firemote;
    })(org.firepick || (org.firepick = {}));
    var firepick = org.firepick;
})(org || (org = {}));
