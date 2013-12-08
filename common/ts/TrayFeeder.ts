///<reference path='../../include.d.ts'/>
module firemote {
	export class TrayFeeder {
		axis: Axis;

		constructor(obj = undefined) {
			if (typeof obj === 'string') {
			  obj = JSON.parse(obj);
			}
			if (typeof obj !== 'undefined') {
				if (obj.hasOwnProperty("axis")) this.axis = new Axis(obj.axis);
			}
			this.axis = this.axis || new Axis({name:"Tray Feeder"});
		}

		validate(): TrayFeeder {
		  this.axis.validate();
		  return this;
		}

		clone(): TrayFeeder {
			return new TrayFeeder(this);
		}
  }
}

exports.TrayFeeder = firemote.TrayFeeder;
