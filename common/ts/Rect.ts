///<reference path='../../include.d.ts'/>
module firemote {
	export class Rect {
			x: number = 0;
			y: number = 0;
			width: number = 0;
			height: number = 0;

			constructor(obj = undefined) {
			  if (typeof obj === 'string') {
				  obj = JSON.parse(obj);
				}
				if (typeof obj !== 'undefined') {
				  if (obj.hasOwnProperty("x")) this.x = obj.x;
				  if (obj.hasOwnProperty("y")) this.y = obj.y;
				  if (obj.hasOwnProperty("width")) this.width = obj.width;
				  if (obj.hasOwnProperty("height")) this.height = obj.height;
				}
			}

			clone(): Rect {
				return new Rect(this);
			}
	}
}

exports.Rect = firemote.Rect;
