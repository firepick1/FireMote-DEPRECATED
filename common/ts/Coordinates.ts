///<reference path='../../include.d.ts'/>
module firemote {
	export class Coordinates {
	  public x: number;
	  public y: number;
	  public z: number;
	  public a: number;
	  public b: number;
	  public c: number;

		constructor(obj = undefined) {
			if (typeof obj === 'string') {
				obj = JSON.parse(obj);
			} else if (obj instanceof Object) {
				if (obj.hasOwnProperty("x")) this.x = obj.x;
				if (obj.hasOwnProperty("y")) this.y = obj.y;
				if (obj.hasOwnProperty("z")) this.z = obj.z;
				if (obj.hasOwnProperty("a")) this.a = obj.a;
				if (obj.hasOwnProperty("b")) this.b = obj.b;
				if (obj.hasOwnProperty("c")) this.c = obj.c;
			}
		}

		clone(): Coordinates {
			return new Coordinates(this);
		}
	}
}

exports.Coordinates = firemote.Coordinates;
