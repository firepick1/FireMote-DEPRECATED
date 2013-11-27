module org.firepick.firemote {
	export class PcbFeeder {
	  name: string = "PCB Feeder";
		axis: Axis;

		constructor(obj = undefined) {
			if (typeof obj === 'string') {
			  obj = JSON.parse(obj);
			}
			if (typeof obj !== 'undefined') {
			  obj.name && (this.name = obj.name);
				obj.axis && (this.axis = new Axis(obj.axis));
			}
			this.axis = this.axis || new Axis({name:this.name});
		}

		clone(): PcbFeeder {
			return new PcbFeeder(this);
		}
  }
}
