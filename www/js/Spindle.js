var org;
(function (org) {
    (function (firepick) {
        ///<reference path='../../include.d.ts'/>
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
        })(firepick.firemote || (firepick.firemote = {}));
        var firemote = firepick.firemote;
    })(org.firepick || (org.firepick = {}));
    var firepick = org.firepick;
})(org || (org = {}));

exports.Spindle = org.firepick.firemote.Spindle;
