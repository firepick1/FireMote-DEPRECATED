///<reference path='../../include.d.ts'/>
module firemote {
	export class Axis {
			name: string = "Unknown axis";
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
					if (obj.hasOwnProperty("pos")) this.pos = obj.pos;
					if (obj.hasOwnProperty("posMax")) this.posMax = obj.posMax;
					if (obj.hasOwnProperty("jog")) this.jog = obj.jog;
					if (obj.hasOwnProperty("calibrate")) this.calibrate = obj.calibrate;
				}
			}

			clone(): Axis {
				return new Axis(this);
			}
	}
}

exports.Axis = firemote.Axis;
