var org;
(function (org) {
    (function (firepick) {
        (function (firemote) {
            var MachineState = (function () {
                function MachineState() {
                    this.message = "FirePick machine state";
                    this.stateId = 1;
                    this.head = new firemote.Head("Left", "Right");
                    this.gantries = [new firemote.Axis("Gantry")];
                    this.trayFeeders = [new firemote.Axis("Tray Feeder")];
                    this.pcbFeeders = [new firemote.Axis("PCB Feeder")];
                }
                MachineState.prototype.clone = function () {
                    var result = new MachineState();
                    result.stateId = this.stateId;
                    result.message = this.message;
                    result.head = this.head.clone();
                    result.gantries = firemote.Axis.cloneArray(this.gantries);
                    result.trayFeeders = firemote.Axis.cloneArray(this.trayFeeders);
                    result.pcbFeeders = firemote.Axis.cloneArray(this.pcbFeeders);
                    return result;
                };
                return MachineState;
            })();
            firemote.MachineState = MachineState;
        })(firepick.firemote || (firepick.firemote = {}));
        var firemote = firepick.firemote;
    })(org.firepick || (org.firepick = {}));
    var firepick = org.firepick;
})(org || (org = {}));
