///<reference path='../../include.d.ts'/>
module firemote {
  export class MachineState {
    message: string = "FirePick machine state";
    stateId: number = 1;
    logLevel: string = "INFO";
    firefuse: Boolean = true;
    gcode: string = "";
    gantries: Gantry[] = [];
    trayFeeders: TrayFeeder[] = [];
    pcbFeeders: PcbFeeder[] = [];
    firestep: FireStep = new FireStep();

    constructor(obj = undefined) {
      if (typeof obj === 'string') {
        obj = JSON.parse(obj);
      }
      if (typeof obj !== 'undefined') {
        if (obj.hasOwnProperty("message")) this.message = obj.message;
        if (obj.hasOwnProperty("gcode")) this.gcode = obj.gcode;
        if (obj.hasOwnProperty("stateId")) this.stateId = obj.stateId;
        if (obj.hasOwnProperty("logLevel")) this.logLevel = obj.logLevel;
        if (obj.hasOwnProperty("firefuse")) this.firefuse = obj.firefuse;
        if (obj.hasOwnProperty("firestep")) this.firestep = obj.firestep;
        if (obj.gantries && obj.gantries.length > 0) {
          for (var i = 0; i < obj.gantries.length; i++) {
            this.gantries.push(new Gantry(obj.gantries[i]));
          }
        }
        if (obj.trayFeeders && obj.trayFeeders.length > 0) {
          for (var i = 0; i < obj.trayFeeders.length; i++) {
            this.trayFeeders.push(new TrayFeeder(obj.trayFeeders[i]));
          }
        }
        if (obj.pcbFeeders && obj.pcbFeeders.length > 0) {
          for (var i = 0; i < obj.pcbFeeders.length; i++) {
            this.pcbFeeders.push(new PcbFeeder(obj.pcbFeeders[i]));
          }
        }
      }
      this.gantries.length > 0 || this.gantries.push(new Gantry({axis:{name:"Gantry", gcAxis:"y"}}));
      this.trayFeeders.length > 0 || this.trayFeeders.push(new TrayFeeder({axis:{name:"Tray Feeder", gcAxis:"x"}}));
      this.pcbFeeders.length > 0 || this.pcbFeeders.push(new PcbFeeder({axis:{name:"PCB Feeder", gcAxis:"z"}}));
    }

    validate(): MachineState {
      for (var i = 0; i < this.gantries.length; i++) {
        this.gantries[i].validate();
      }
      for (var i = 0; i < this.trayFeeders.length; i++) {
        this.trayFeeders[i].validate();
      }
      for (var i = 0; i < this.pcbFeeders.length; i++) {
        this.pcbFeeders[i].validate();
      }
      return this;
    }

    clearForLinearMotion() {
      for (var i = 0; i < this.gantries.length; i++) {
        var spindles = this.gantries[i].head.spindles;
        for (var j = 0; j < spindles.length; j++) {
          spindles[j].pos = 100; // raise all spindles
        }
      }
    }

    calibrate(gc:GCoder = new GCoder()) {
      var axes = this.linearAxes();
      var coords = new Coordinates();

      for (var i = 0; i < axes.length; i++) {
        if (axes[i].calibrate === "home") {
          coords[axes[i].gcAxis] = 0;
          axes[i].pos = 0;
        }
        axes[i].calibrate = "";
      }

      gc.home(coords);
    }

    moveTo(newState: MachineState, gc:GCoder = new GCoder()) {
      var axes1 = this.linearAxes();
      var axes2 = this.linearAxes(newState);
      var coords = new Coordinates();

      for (var i = 0; i < axes1.length; i++) {
        if (axes2[i] instanceof Object) {
          var newPos = axes2[i].pos;
          if (!isNaN(newPos) && axes1[i].pos !== newPos) {
            coords[axes1[i].gcAxis] = newPos;
            axes1[i].pos = newPos;
          }
        }
      }

      gc.moveTo(coords);
    }

    linearAxes(machine:MachineState = this): LinearAxis[] {
      var result:LinearAxis[] = [];

      if (machine.gantries instanceof Array) {
        for (var i = 0; i < machine.gantries.length; i++) {
          result.push(machine.gantries[i].axis);
        }
      }
      if (machine.pcbFeeders instanceof Array) {
        for (var i = 0; i < machine.pcbFeeders.length; i++) {
          result.push(machine.pcbFeeders[i].axis);
        }
      }
      if (machine.trayFeeders instanceof Array) {
        for (var i = 0; i < machine.trayFeeders.length; i++) {
          result.push(machine.trayFeeders[i].axis);
        }
      }

      return result;
    }

    clone(): MachineState {
      return new MachineState(this);
    }
  }
}

exports.MachineState = firemote.MachineState;
