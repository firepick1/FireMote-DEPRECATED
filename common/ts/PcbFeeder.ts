///<reference path='../../include.d.ts'/>
module firemote {
	export class PcbFeeder {
	  name: string = "PCB Feeder";
		axis: Axis;

		constructor(obj = undefined) {
			if (typeof obj === 'string') {
			  obj = JSON.parse(obj);
			}
			if (typeof obj !== 'undefined') {
			  if (obj.hasOwnProperty("name")) this.name = obj.name;
				if (obj.hasOwnProperty("axis")) this.axis = new Axis(obj.axis);
			}
			this.axis = this.axis || new Axis({name:this.name});
		}

		clone(): PcbFeeder {
			return new PcbFeeder(this);
		}
  }
}

exports.PcbFeeder = firemote.PcbFeeder;
