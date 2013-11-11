module org.firepick.firemote {
	export class MachineState {
		message: string = "FirePick machine state";
		stateId: number = 1;
		head: Head = new Head("Left", "Right");
		gantries: Axis[] = [new Axis("Gantry")];
		trayFeeders: Axis[] = [new Axis("Tray Feeder")];
		pcbFeeders: Axis[] = [new Axis("PCB Feeder")];

		constructor() {}

		clone(): MachineState {
			var result: MachineState = new MachineState();
			result.stateId = this.stateId;
			result.message = this.message;
			result.head = this.head.clone();
			result.gantries = Axis.cloneArray(this.gantries);
			result.trayFeeders = Axis.cloneArray(this.trayFeeders);
			result.pcbFeeders = Axis.cloneArray(this.pcbFeeders);
			return result;
		}
  }
}
