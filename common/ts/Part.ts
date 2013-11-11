module org.firepick.firemote {
	export class Part {
			pcbId: string;
			name: string;

			constructor(name_: string = "0 ohm resistor", pcbId_: string = "R0") {
				this.pcbId = pcbId_;
				this.name = name_;
			}

			clone(): Part {
				var result = new Part(this.name, this.pcbId);
				return result;
			}
	}
}
