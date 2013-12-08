///<reference path='../../include.d.ts'/>
module firemote {
	export class Gantry {
		head: Head;
		axis: Axis;

		constructor(obj = undefined) {
			if (typeof obj === 'string') {
			  obj = JSON.parse(obj);
			}
			if (typeof obj !== 'undefined') {
				if (obj.hasOwnProperty("head")) this.head = new Head(obj.head);
				if (obj.hasOwnProperty("axis")) this.axis = new Axis(obj.axis);
			}
			this.axis = this.axis || new Axis({name:"Gantry"});
			this.head = this.head || new Head();
		}

		validate(): Gantry {
		  this.axis.validate();
		  return this;
		}

		clone(): Gantry {
			return new Gantry(this);
		}
  }
}

exports.Gantry = firemote.Gantry;
