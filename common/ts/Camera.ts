///<reference path='../../include.d.ts'/>
module firemote {
	export class Camera {
			angle: number = 0;
			scale: number = 1;
			light: boolean = false;

			constructor(obj = undefined) {
			  if (typeof obj === 'string') {
				  obj = JSON.parse(obj);
				}
				if (typeof obj !== 'undefined') {
				  if (obj.hasOwnProperty("angle")) this.angle = obj.angle;
				  if (obj.hasOwnProperty("light")) this.light = obj.light;
				  if (obj.hasOwnProperty("scale")) this.scale = obj.scale;
				}
			}

			clone(): Camera {
				return new Camera(this);
			}
	}
}

exports.Camera = firemote.Camera;
