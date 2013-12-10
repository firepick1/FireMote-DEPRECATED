///<reference path='../../include.d.ts'/>
module firemote {
	export class PcbFeeder {
		axis: LinearAxis;

		constructor(obj = undefined) {
			if (typeof obj === 'string') {
			  obj = JSON.parse(obj);
			}
			this.axis = new LinearAxis({name:"PCB Feeder", gcAxis:"z"});
			if (typeof obj !== 'undefined') {
			  var df = new DeltaFactory();
				if (obj.hasOwnProperty("axis")) df.applyDiff(obj.axis, this.axis);
			}
		}

		validate(): PcbFeeder {
		  this.axis.validate();
		  return this;
		}

		clone(): PcbFeeder {
			return new PcbFeeder(this);
		}
  }
}

exports.PcbFeeder = firemote.PcbFeeder;
