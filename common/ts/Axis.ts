///<reference path='../../include.d.ts'/>
module firemote {
	export class Axis {
			name: string = "Unknown axis";
			gcAxis: string = "x";
			pos: number = 0;
			posMax: number = 100;
			jog: number = 1;
			calibrate: boolean = false;

			constructor(obj = undefined) {
				if (typeof obj === 'string') {
				  obj = JSON.parse(obj);
				}
				if (typeof obj !== 'undefined') {
				  if (obj.hasOwnProperty("name")) this.name = obj.name;
				  if (obj.hasOwnProperty("gcAxis")) this.gcAxis = obj.gcAxis;
					if (obj.hasOwnProperty("pos")) this.pos = obj.pos*1;
					if (obj.hasOwnProperty("posMax")) this.posMax = obj.posMax*1;
					if (obj.hasOwnProperty("jog")) this.jog = obj.jog*1;
					if (obj.hasOwnProperty("calibrate")) this.calibrate = obj.calibrate;
				}
			}

			validate(): Axis {
			  this.gcAxis = this.gcAxis || "x";
			  this.posMax = this.posMax*1;
			  this.pos = Math.max(0, Math.min(this.posMax, this.pos*1));
				this.jog = this.jog*1;
				return this;
			}

			clone(): Axis {
				return new Axis(this);
			}
	}
}

exports.Axis = firemote.Axis;
