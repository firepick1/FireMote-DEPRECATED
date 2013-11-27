import Axis = org.firepick.firemote.Axis;
import Spindle = org.firepick.firemote.Spindle;

module org.firepick.firemote {
	export class Head {
			spindles: Spindle[] = [];
			angle: number = 0;

			constructor(obj = undefined) {
			  if (typeof obj === 'string') {
				  obj = JSON.parse(obj);
				}
				if (typeof obj !== 'undefined') {
				  obj.angle && (this.angle = obj.angle);
					if (obj.spindles && obj.spindles.length > 0) {
					  for (var i = 0; i < obj.spindles.length; i++) {
						  this.spindles.push(new Spindle(obj.spindles[i]));
						}
					}
				}
				this.spindles.length > 0 || this.spindles.push(new Spindle({name:"Left"}));
			}

			clone(): Head {
				return new Head(this);
			}
	}
}

