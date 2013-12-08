///<reference path='../../include.d.ts'/>
module firemote {
	export class PcbFeeder {
		axis: Axis;

		constructor(obj = undefined) {
			if (typeof obj === 'string') {
			  obj = JSON.parse(obj);
			}
			if (typeof obj !== 'undefined') {
				if (obj.hasOwnProperty("axis")) this.axis = new Axis(obj.axis);
			}
			this.axis = this.axis || new Axis({name:"PCB Feeder"});
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
