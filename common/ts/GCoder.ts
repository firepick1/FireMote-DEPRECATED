///<reference path='../../include.d.ts'/>
module firemote {
  export class GCoder {
    write: StringWriter = function (s:string) { console.log(s); };

    constructor(obj = undefined) {
      if (typeof obj === 'string') {
        obj = JSON.parse(obj);
      } else if (obj instanceof Function) {
        this.write = <StringWriter> obj;
      } else if (typeof obj !== 'undefined') {
        if (obj.hasOwnProperty("write")) this.write = obj.write;
      }
    }

    private coordString(coords: Coordinates): string {
      var gcode: string = "";
      if (!isNaN( coords.x )) gcode += "X" + coords.x;
      if (!isNaN( coords.y )) gcode += "Y" + coords.y;
      if (!isNaN( coords.z )) gcode += "Z" + coords.z;
      if (!isNaN( coords.a )) gcode += "A" + coords.a;
      if (!isNaN( coords.b )) gcode += "B" + coords.b;
      if (!isNaN( coords.c )) gcode += "C" + coords.c;
      return gcode;
    }

    home(coords: Coordinates) {
      var gcode: string = this.coordString(coords);
      if (gcode.length > 0) {
        gcode = "G28.2" + gcode;
        this.write(gcode);
      }
      return gcode;
    }

    moveTo(coords: Coordinates) {
      var gcode: string = this.coordString(coords);
      if (gcode.length > 0) {
        gcode = "G0" + gcode;
        this.write(gcode);
      }
      return gcode;
    }

    clone(): GCoder {
      return new GCoder(this);
    }
  }
}

exports.GCoder = firemote.GCoder;
