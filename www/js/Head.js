var Axis = org.firepick.firemote.Axis;
var Spindle = org.firepick.firemote.Spindle;

var org;
(function (org) {
    (function (firepick) {
        (function (firemote) {
            var Head = (function () {
                function Head(obj) {
                    if (typeof obj === "undefined") { obj = undefined; }
                    this.spindles = [];
                    this.angle = 0;
                    if (typeof obj === 'string') {
                        obj = JSON.parse(obj);
                    }
                    if (typeof obj !== 'undefined') {
                        obj.angle && (this.angle = obj.angle);
                        if (obj.spindles && obj.spindles.length > 0) {
                            for (var i = 0; i < obj.spindles.length; i++) {
                                this.spindles.push(new firemote.Spindle(obj.spindles[i]));
                            }
                        }
                    }
                    this.spindles.length > 0 || this.spindles.push(new firemote.Spindle({ name: "Left" }));
                }
                Head.prototype.clone = function () {
                    return new Head(this);
                };
                return Head;
            })();
            firemote.Head = Head;
        })(firepick.firemote || (firepick.firemote = {}));
        var firemote = firepick.firemote;
    })(org.firepick || (org.firepick = {}));
    var firepick = org.firepick;
})(org || (org = {}));
