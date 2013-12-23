///<reference path='../../include.d.ts'/>
module firemote {
	export class Camera {
			imageAngle: number = 0;
			reticleAngle: number = 0;
			pixelsPerMM: number = 1;
			light: boolean = false;

			constructor(obj = undefined) {
			  if (typeof obj === 'string') {
				  obj = JSON.parse(obj);
				}
				if (typeof obj !== 'undefined') {
				  if (obj.hasOwnProperty("imageAngle")) this.imageAngle = obj.imageAngle;
				  if (obj.hasOwnProperty("reticleAngle")) this.reticleAngle = obj.reticleAngle;
				  if (obj.hasOwnProperty("light")) this.light = obj.light;
				  if (obj.hasOwnProperty("pixelsPerMM")) this.pixelsPerMM = obj.pixelsPerMM;
				}
			}

			clone(): Camera {
				return new Camera(this);
			}
	}
}

exports.Camera = firemote.Camera;
