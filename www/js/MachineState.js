var org;
(function (org) {
    (function (firepick) {
        (function (firemote) {
            var MachineState = (function () {
                function MachineState(obj) {
                    if (typeof obj === "undefined") { obj = undefined; }
                    this.message = "FirePick machine state";
                    this.stateId = 1;
                    this.gantries = [];
                    this.trayFeeders = [];
                    this.pcbFeeders = [];
                    if (typeof obj === 'string') {
                        obj = JSON.parse(obj);
                    }
                    if (typeof obj !== 'undefined') {
                        obj.message && (this.message = obj.message);
                        obj.stateId && (this.stateId = obj.stateId);
                        if (obj.gantries && obj.gantries.length > 0) {
                            for (var i = 0; i < obj.gantries.length; i++) {
                                this.gantries.push(new firemote.Gantry(obj.gantries[i]));
                            }
                        }
                        if (obj.trayFeeders && obj.trayFeeders.length > 0) {
                            for (var i = 0; i < obj.trayFeeders.length; i++) {
                                this.trayFeeders.push(new firemote.TrayFeeder(obj.trayFeeders[i]));
                            }
                        }
                        if (obj.pcbFeeders && obj.pcbFeeders.length > 0) {
                            for (var i = 0; i < obj.pcbFeeders.length; i++) {
                                this.pcbFeeders.push(new firemote.PcbFeeder(obj.pcbFeeders[i]));
                            }
                        }
                    }
                    this.gantries.length > 0 || this.gantries.push(new firemote.Gantry());
                    this.trayFeeders.length > 0 || this.trayFeeders.push(new firemote.TrayFeeder());
                    this.pcbFeeders.length > 0 || this.pcbFeeders.push(new firemote.PcbFeeder());
                }
                MachineState.prototype.clone = function () {
                    return new MachineState(this);
                };
                return MachineState;
            })();
            firemote.MachineState = MachineState;
        })(firepick.firemote || (firepick.firemote = {}));
        var firemote = firepick.firemote;
    })(org.firepick || (org.firepick = {}));
    var firepick = org.firepick;
})(org || (org = {}));
