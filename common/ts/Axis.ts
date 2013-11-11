module org.firepick.firemote {
	export class Axis {
			name: string;
			pos: number = 0;
			posMax: number;
			jog: number = 1;
			calibrate: Boolean = false;

			constructor(public name_:string = "Unknown Axis", public posMax_: number = 100) {
				this.name = name_;
				this.posMax = posMax_;
			}

			clone(): Axis {
				var result = new Axis(this.name, this.posMax);
				result.pos = this.pos;
				result.jog = this.jog;
				result.calibrate = this.calibrate;
				return result;
			}

			static cloneArray(value: Axis[]): Axis[] {
				var result: Axis[] = [];
				for (var i = 0; i < value.length; i++) {
					var axis:Axis = value[i];
					result.push(axis.clone());
				}
				return result;
			}
	}
}
