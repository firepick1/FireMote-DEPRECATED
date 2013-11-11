var org;
(function (org) {
    (function (firepick) {
        (function (firemote) {
            var Part = (function () {
                function Part(name_, pcbId_) {
                    if (typeof name_ === "undefined") { name_ = "0 ohm resistor"; }
                    if (typeof pcbId_ === "undefined") { pcbId_ = "R0"; }
                    this.pcbId = pcbId_;
                    this.name = name_;
                }
                Part.prototype.clone = function () {
                    var result = new Part(this.name, this.pcbId);
                    return result;
                };
                return Part;
            })();
            firemote.Part = Part;
        })(firepick.firemote || (firepick.firemote = {}));
        var firemote = firepick.firemote;
    })(org.firepick || (org.firepick = {}));
    var firepick = org.firepick;
})(org || (org = {}));
