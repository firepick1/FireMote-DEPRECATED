import Axis = org.firepick.firemote.Axis;
import Spindle = org.firepick.firemote.Spindle;

module org.firepick.firemote {
	export class Head {
			spindles: Spindle[] = [];
			angle: number = 0;

			constructor(s0: string = "Spindle", s1: string = undefined, s2: string = undefined, s3: string = undefined) {
				s0 && this.spindles.push(new Spindle(s0));
				s1 && this.spindles.push(new Spindle(s1));
				s2 && this.spindles.push(new Spindle(s2));
				s3 && this.spindles.push(new Spindle(s3));
			}

			clone(): Head {
				var result = new Head();
				result.spindles = [];
				for (var i = 0; i < this.spindles.length; i++) {
					result.spindles.push(this.spindles[i].clone());
				}
				result.angle = this.angle;
				return result;
			}
	}
}

