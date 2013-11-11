var Axis = org.firepick.firemote.Axis;
var Spindle = org.firepick.firemote.Spindle;

var org;
(function (org) {
    (function (firepick) {
        (function (firemote) {
            var Head = (function () {
                function Head(s0, s1, s2, s3) {
                    if (typeof s0 === "undefined") { s0 = "Spindle"; }
                    if (typeof s1 === "undefined") { s1 = undefined; }
                    if (typeof s2 === "undefined") { s2 = undefined; }
                    if (typeof s3 === "undefined") { s3 = undefined; }
                    this.spindles = [];
                    this.angle = 0;
                    s0 && this.spindles.push(new firemote.Spindle(s0));
                    s1 && this.spindles.push(new firemote.Spindle(s1));
                    s2 && this.spindles.push(new firemote.Spindle(s2));
                    s3 && this.spindles.push(new firemote.Spindle(s3));
                }
                Head.prototype.clone = function () {
                    var result = new Head();
                    result.spindles = [];
                    for (var i = 0; i < this.spindles.length; i++) {
                        result.spindles.push(this.spindles[i].clone());
                    }
                    result.angle = this.angle;
                    return result;
                };
                return Head;
            })();
            firemote.Head = Head;
        })(firepick.firemote || (firepick.firemote = {}));
        var firemote = firepick.firemote;
    })(org.firepick || (org.firepick = {}));
    var firepick = org.firepick;
})(org || (org = {}));
