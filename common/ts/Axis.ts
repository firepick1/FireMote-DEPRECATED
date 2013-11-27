module org.firepick.firemote {
	export class Axis {
			name: string = "Unknown axis";
			pos: number = 0;
			posMax: number = 100;
			jog: number = 1;
			calibrate: Boolean = false;

			constructor(obj = undefined) {
				if (typeof obj === 'string') {
				  obj = JSON.parse(obj);
				}
				if (typeof obj !== 'undefined') {
				  obj.name && (this.name = obj.name);
					obj.pos && (this.pos = obj.pos);
					obj.posMax && (this.posMax = obj.posMax);
					obj.jog && (this.jog = obj.jog);
					obj.calibrate && (this.calibrate = obj.calibrate);
				}
			}

			clone(): Axis {
				return new Axis(this);
			}
	}
}
