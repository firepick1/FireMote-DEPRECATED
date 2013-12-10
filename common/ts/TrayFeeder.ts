///<reference path='../../include.d.ts'/>
module firemote {
	export class TrayFeeder {
		axis: LinearAxis;

		constructor(obj = undefined) {
			if (typeof obj === 'string') {
			  obj = JSON.parse(obj);
			}
			this.axis = new LinearAxis({name:"Tray Feeder", gcAxis:"x"});
			if (typeof obj !== 'undefined') {
			  var df = new DeltaFactory();
				if (obj.hasOwnProperty("axis")) df.applyDiff(obj.axis, this.axis);
			}
		}

		validate(): TrayFeeder {
		  this.axis.validate();
		  return this;
		}

		clone(): TrayFeeder {
			return new TrayFeeder(this);
		}
  }
}

exports.TrayFeeder = firemote.TrayFeeder;
