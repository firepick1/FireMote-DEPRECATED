var org;
(function (org) {
    (function (firepick) {
        (function (firemote) {
            var Part = (function () {
                function Part(obj) {
                    this.name = "0 ohm resistor";
                    this.pcbId = "R0";
                    if (typeof obj === 'string') {
                        obj = JSON.parse(obj);
                    }
                    if (typeof obj !== 'undefined') {
                        this.name = obj.name || this.name;
                        this.pcbId = obj.pcbId || this.pcbId;
                    }
                }
                Part.prototype.clone = function () {
                    return new Part(this);
                };
                return Part;
            })();
            firemote.Part = Part;
        })(firepick.firemote || (firepick.firemote = {}));
        var firemote = firepick.firemote;
    })(org.firepick || (org.firepick = {}));
    var firepick = org.firepick;
})(org || (org = {}));
