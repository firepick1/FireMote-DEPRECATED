///<reference path='../../include.d.ts'/>
module firemote {
	export class Head {
			spindles: Spindle[] = [];
			angle: number = 0;
			camera: Camera = new Camera();

			constructor(obj = undefined) {
			  if (typeof obj === 'string') {
				  obj = JSON.parse(obj);
				}
				if (typeof obj !== 'undefined') {
				  if (obj.hasOwnProperty("angle")) this.angle = obj.angle;
				  if (obj.hasOwnProperty("camera")) this.camera = new Camera(obj.camera);
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

exports.Head = firemote.Head;
