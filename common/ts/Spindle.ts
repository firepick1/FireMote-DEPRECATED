import Part = org.firepick.firemote.Part;

module org.firepick.firemote {
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
				  obj.name && (this.name = obj.name);
					obj.on && (this.on = obj.on);
					obj.pos && (this.pos = obj.pos);
					obj.part && (this.part = obj.part.clone());
				}
			}

			clone(): Spindle {
				return new Spindle(this);
			}
	}
}
