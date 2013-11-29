///<reference path='../../include.d.ts'/>
module firemote {
	export class Spindle {
			name: string = "Spindle";
			on: Boolean = false;
			pos: number = 100;
			part: Part;

			constructor(obj = undefined) {
				if (typeof obj === 'string') {
				  obj = JSON.parse(obj);
				}
				if (typeof obj !== 'undefined') {
				  if (obj.hasOwnProperty("name")) this.name = obj.name;
					if (obj.hasOwnProperty("on")) this.on = obj.on;
					if (obj.hasOwnProperty("pos")) this.pos = obj.pos;
					if (obj.hasOwnProperty("part")) this.part = obj.part.clone();
				}
			}

			clone(): Spindle {
				return new Spindle(this);
			}
	}
}

exports.firemote = firemote;
