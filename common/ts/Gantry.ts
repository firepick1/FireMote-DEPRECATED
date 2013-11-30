///<reference path='../../include.d.ts'/>
module firemote {
	export class Gantry {
	  name: string;
		head: Head;
		axis: Axis;

		constructor(obj = undefined) {
			if (typeof obj === 'string') {
			  obj = JSON.parse(obj);
			}
			if (typeof obj !== 'undefined') {
			  if (obj.hasOwnProperty("name")) this.name = obj.name;
				if (obj.hasOwnProperty("head")) this.head = new Head(obj.head);
				if (obj.hasOwnProperty("axis")) this.axis = new Axis(obj.axis);
			}
			this.name = this.name || "Gantry";
			this.axis = this.axis || new Axis({name:this.name});
			this.head = this.head || new Head({name:this.name});
		}

		clone(): Gantry {
			return new Gantry(this);
		}
  }
}

exports.Gantry = firemote.Gantry;
