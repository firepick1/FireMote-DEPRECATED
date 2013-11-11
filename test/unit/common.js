'use strict';

describe('common-js-tests', function(){
  it('should create a Part', inject(function() {
			var part = new org.firepick.firemote.Part();
			expect(part.name).toBe("0 ohm resistor");
			expect(part.pcbId).toBe("R0");

			var part2 = part.clone().clone();
			part.name ="A";
			part.pcbId = "B";
			expect(part2.name).toBe("0 ohm resistor");
			expect(part2.pcbId).toBe("R0");
			expect(part.name).toBe("A");
			expect(part.pcbId).toBe("B");
	}));

  it('should create an Axis', inject(function() {
			// Test default
			var axis = new org.firepick.firemote.Axis();
			expect(axis.name).toBe("Unknown Axis");
			expect(axis.pos).toBe(0);
			expect(axis.posMax).toBe(100);
			expect(axis.jog).toBe(1);
			expect(axis.calibrate).toBe(false);

			// Test constructor
			axis = new org.firepick.firemote.Axis("Gantry", 500);
			expect(axis.name).toBe("Gantry");
			expect(axis.pos).toBe(0);
			expect(axis.posMax).toBe(500);
			expect(axis.jog).toBe(1);
			expect(axis.calibrate).toBe(false);

			// Test clone()
			var axis2 = axis.clone().clone();
			axis.pos = 2;
			axis.name = "blueberry";
			axis.jog = 3;
			axis.posMax = 4;
			axis.calibrate = true;
			expect(axis.name).toBe("blueberry");
			expect(axis.pos).toBe(2);
			expect(axis.posMax).toBe(4);
			expect(axis.jog).toBe(3);
			expect(axis.calibrate).toBe(true);
			expect(axis2.name).toBe("Gantry");
			expect(axis2.pos).toBe(0);
			expect(axis2.posMax).toBe(500);
			expect(axis2.jog).toBe(1);
			expect(axis2.calibrate).toBe(false);
  }));

  it('should create a Spindle', inject(function() {
			// Test default
			var spindle = new org.firepick.firemote.Spindle();
			expect(spindle.name).toBe("Left");
			expect(spindle.pos).toBe(100);
			expect(spindle.on).toBe(false);
			expect(spindle.part).toBe();

			// Test constructor
			var spindle2 = new org.firepick.firemote.Spindle("Right");
			expect(spindle2.name).toBe("Right");
			expect(spindle2.pos).toBe(100);
			expect(spindle2.on).toBe(false);
			expect(spindle2.part).toBe();
			spindle2.on = true;
			spindle2.part = new org.firepick.firemote.Part();
			spindle2.pos = 0;
			expect(spindle2.pos).toBe(0);
			expect(spindle2.on).toBe(true);
			expect(spindle2.part.pcbId).toBe("R0");

			// Test clone()
			spindle2 = spindle.clone().clone();
			spindle.name = "X";
			spindle.on = true;
			spindle.part = true;
			spindle.pos  = 0;
			expect(spindle2.name).toBe("Left");
			expect(spindle2.pos).toBe(100);
			expect(spindle2.on).toBe(false);
			expect(spindle2.part).toBe();
  }));

	it('should create a Head', inject(function() {
			// Test default
			var head = new org.firepick.firemote.Head();
			expect(head.spindles.length).toBe(1);
			expect(head.spindles[0].name).toBe("Spindle");
			expect(head.angle).toBe(0);
			head = new org.firepick.firemote.Head("L");
			expect(head.spindles[0].name).toBe("L");
			expect(head.spindles.length).toBe(1);
			head = new org.firepick.firemote.Head("L", "R");
			expect(head.spindles.length).toBe(2);
			expect(head.spindles[0].name).toBe("L");
			expect(head.spindles[1].name).toBe("R");
			head = new org.firepick.firemote.Head("L", "R");
			expect(head.spindles[0].name).toBe("L");
			expect(head.spindles[1].name).toBe("R");

			var head2 = head.clone().clone();
			head.spindles[0].name = "x";
			head.spindles[1].name = "y";
			head.angle = 360;
			expect(head.spindles[0].name).toBe("x");
			expect(head.spindles[1].name).toBe("y");
			expect(head.angle).toBe(360);
			expect(head2.spindles[0].name).toBe("L");
			expect(head2.spindles[1].name).toBe("R");
			expect(head2.angle).toBe(0);
	}));

	it('should create a MachineState', inject(function() {
		var state = new org.firepick.firemote.MachineState();
		expect(state.head.spindles[0].name).toBe("Left");
		expect(state.head.spindles[1].name).toBe("Right");
		expect(state.gantries[0].name).toBe("Gantry");
		expect(state.trayFeeders[0].name).toBe("Tray Feeder");
		expect(state.pcbFeeders[0].name).toBe("PCB Feeder");
		expect(state.stateId).toBe(1);
		expect(state.message).toBe("FirePick machine state");

		var state2 = state.clone().clone();
		state.head.spindles[0].name = "L";
		state.head.spindles[1].name = "R";
		state.gantries[0].name = "G";
		state.trayFeeders[0].name = "T";
		state.pcbFeeders[0].name = "P";
		state.stateId = 2;
		state.message = "M";
		expect(state2.head.spindles[0].name).toBe("Left");
		expect(state2.head.spindles[1].name).toBe("Right");
		expect(state2.gantries[0].name).toBe("Gantry");
		expect(state2.trayFeeders[0].name).toBe("Tray Feeder");
		expect(state2.pcbFeeders[0].name).toBe("PCB Feeder");
		expect(state.head.spindles[0].name).toBe("L");
		expect(state.head.spindles[1].name).toBe("R");
		expect(state.gantries[0].name).toBe("G");
		expect(state.trayFeeders[0].name).toBe("T");
		expect(state.pcbFeeders[0].name).toBe("P");
		expect(state.stateId).toBe(2);
		expect(state.message).toBe("M");
	}));

});
