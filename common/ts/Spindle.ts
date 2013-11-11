import Part = org.firepick.firemote.Part;

module org.firepick.firemote {
	export class Spindle {
			name: string;
			on: Boolean = false;
			pos: number = 100;
			part: Part;

			constructor(public name_: string = "Left") {
				this.name = name_;
			}

			clone(): Spindle {
				var result = new Spindle(this.name);
				result.on = this.on;
				result.part = this.part;
				result.pos = this.pos;
				return result;
			}
	}
}
