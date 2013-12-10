///<reference path='../../include.d.ts'/>
module firemote {
	export class MachineState {
		message: string = "FirePick machine state";
		stateId: number = 1;
		logLevel: string = "INFO";
		firefuse: Boolean = true;
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

		linearMotionGCode(newMachine) : string {
		  var df = new DeltaFactory();
			var axes1 = this.linearAxes();
			var axes2 = newMachine.linearAxes();
			var axesDiff: LinearAxis[] = <LinearAxis[]>df.diff(axes1, axes2);
			var result = "G0";
			for (var i = 0; i < axesDiff.length; i++) {
			  var axisDiff = axesDiff[i];
			  if (typeof axisDiff !== 'undefined') {
					result = result + axes2[i].gcAxis;
					result = result + axesDiff[i].pos;
				}
			}
			return result;
		}

		linearAxes(): LinearAxis[] {
		  var result:LinearAxis[] = [];

			for (var i = 0; i < this.gantries.length; i++) {
			  result.push(this.gantries[i].axis);
			}
			for (var i = 0; i < this.pcbFeeders.length; i++) {
			  result.push(this.pcbFeeders[i].axis);
			}
			for (var i = 0; i < this.trayFeeders.length; i++) {
			  result.push(this.trayFeeders[i].axis);
			}

			return result;
		}

		clone(): MachineState {
			return new MachineState(this);
		}
  }
}

exports.MachineState = firemote.MachineState;
