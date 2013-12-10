///<reference path='../../include.d.ts'/>
module firemote {
	export class Gantry {
		head: Head;
		axis: LinearAxis;

		constructor(obj = undefined) {
			if (typeof obj === 'string') {
			  obj = JSON.parse(obj);
			}
			this.axis = new LinearAxis({name:"Gantry", gcAxis:"y"});
			this.head = new Head(obj && obj.head);
			if (typeof obj !== 'undefined') {
			  var df = new DeltaFactory();
				if (obj.hasOwnProperty("axis")) df.applyDiff(obj.axis, this.axis);
			}
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
