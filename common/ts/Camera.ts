///<reference path='../../include.d.ts'/>
module firemote {
	export class Camera {
			imageAngle: number = 0;
			reticleAngle: number = 0;
			pixelsPerMM: number = 1;
			light: boolean = false;
			crop: Rect= new Rect();
			image: Rect = new Rect({width:800, height:200});

			constructor(obj = undefined) {
			  if (typeof obj === 'string') {
				  obj = JSON.parse(obj);
				}
				if (typeof obj !== 'undefined') {
				  if (obj.hasOwnProperty("imageAngle")) this.imageAngle = obj.imageAngle;
				  if (obj.hasOwnProperty("reticleAngle")) this.reticleAngle = obj.reticleAngle;
				  if (obj.hasOwnProperty("light")) this.light = obj.light;
				  if (obj.hasOwnProperty("pixelsPerMM")) this.pixelsPerMM = obj.pixelsPerMM;
				  if (obj.hasOwnProperty("crop")) this.crop = new Rect(obj.crop);
				  if (obj.hasOwnProperty("image")) this.image = new Rect(obj.image);
				}
			}

			clone(): Camera {
				return new Camera(this);
			}
	}
}

exports.Camera = firemote.Camera;
