module org.firepick.firemote {
	export class Part {
			name: string;
			pcbId: string;

			constructor(obj) {
				this.name = "0 ohm resistor";
				this.pcbId = "R0";
				if (typeof obj === 'string') {
				  obj = JSON.parse(obj);
				}
				if (typeof obj !== 'undefined') {
					this.name = obj.name || this.name;
					this.pcbId = obj.pcbId || this.pcbId;
				}
			}

			clone(): Part {
			  return new Part(this);
			}
	}
}
