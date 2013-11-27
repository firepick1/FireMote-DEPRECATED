'use strict';

describe('common-js-tests', function(){
  it('1. should create a Part', inject(function() {
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

			var part3 = part.clone();
			expect(part3.name).toBe("A");
			expect(part3.pcbId).toBe("B");
	}));

  it('2. should create an Axis', inject(function() {
			// Test default
			var axis = new org.firepick.firemote.Axis();
			expect(axis.name).toBe("Unknown axis");
			expect(axis.pos).toBe(0);
			expect(axis.posMax).toBe(100);
			expect(axis.jog).toBe(1);
			expect(axis.calibrate).toBe(false);

			// Test constructor
			axis = new org.firepick.firemote.Axis({name:"Gantry", posMax:500});
			expect(axis.name).toBe("Gantry");
			expect(axis.pos).toBe(0);
			expect(axis.posMax).toBe(500);
			expect(axis.jog).toBe(1);
			expect(axis.calibrate).toBe(false);

			// Test clone()
			axis.pos = 1;
			axis.posMax = 101;
			axis.jog = 2;
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
			expect(axis2.pos).toBe(1);
			expect(axis2.posMax).toBe(101);
			expect(axis2.jog).toBe(2);
			expect(axis2.calibrate).toBe(false);
  }));

  it('3. should create a Spindle', inject(function() {
			// Test default
			var spindle = new org.firepick.firemote.Spindle();
			expect(spindle.name).toBe("Spindle");
			expect(spindle.pos).toBe(100);
			expect(spindle.on).toBe(false);
			expect(spindle.part).toBe();

			// Test constructor
			var spindle2 = new org.firepick.firemote.Spindle({name:"Right", pos:50, on:true});
			expect(spindle2.name).toBe("Right");
			expect(spindle2.pos).toBe(50);
			expect(spindle2.on).toBe(true);
			expect(spindle2.part).toBe();
			spindle2.part = new org.firepick.firemote.Part();
			spindle2.pos = 0;
			expect(spindle2.pos).toBe(0);
			expect(spindle2.part.pcbId).toBe("R0");

			// Test clone()
			spindle2 = spindle.clone().clone();
			spindle.name = "X";
			spindle.on = true;
			spindle.pos  = 0;
			expect(spindle2.name).toBe("Spindle");
			expect(spindle2.pos).toBe(100);
			expect(spindle2.on).toBe(false);
  }));

	it('4. should create a Head', inject(function() {
			// Test default
			var head = new org.firepick.firemote.Head();
			expect(head.spindles.length).toBe(1);
			expect(head.spindles[0].name).toBe("Left");
			expect(head.angle).toBe(0);
			head = new org.firepick.firemote.Head({spindles:[{name:"L"}]});
			expect(head.spindles[0].name).toBe("L");
			expect(head.spindles.length).toBe(1);
			head = new org.firepick.firemote.Head({spindles:[{name:"L"}, {name:"R"}]});
			expect(head.spindles.length).toBe(2);
			expect(head.spindles[0].name).toBe("L");
			expect(head.spindles[1].name).toBe("R");
			head = new org.firepick.firemote.Head({spindles:[{name:"L"}, {name:"R"}]});
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

	it('5. should create a Gantry', inject(function() {
		 var gantry = new org.firepick.firemote.Gantry();
		 expect(gantry.head.spindles.length).toBe(1);
		 expect(gantry.head.spindles[0].name).toBe("Left");
		 expect(gantry.axis.name).toBe("Gantry");
		 expect(gantry.name).toBe("Gantry");

		 gantry = new org.firepick.firemote.Gantry({name:"G", head:{spindles:[{name:"S0"},{name:"S1"},{name:"S2"},{name:"S3"}]}});
		 expect(gantry.head.spindles.length).toBe(4);
		 expect(gantry.head.spindles[0].name).toBe("S0");
		 expect(gantry.head.spindles[1].name).toBe("S1");
		 expect(gantry.head.spindles[2].name).toBe("S2");
		 expect(gantry.head.spindles[3].name).toBe("S3");
		 expect(gantry.axis.name).toBe("G");
		 expect(gantry.name).toBe("G");
	}));

	it('6. should create a MachineState', inject(function() {
		var state = new org.firepick.firemote.MachineState();
		expect(state.gantries[0].head.spindles[0].name).toBe("Left");
		expect(state.gantries[0].head.spindles.length).toBe(1);
		expect(state.gantries[0].name).toBe("Gantry");
		expect(state.trayFeeders[0].name).toBe("Tray Feeder");
		expect(state.pcbFeeders[0].name).toBe("PCB Feeder");
		expect(state.stateId).toBe(1);
		expect(state.message).toBe("FirePick machine state");
    var json = JSON.stringify({
			message:"M",
			stateId:123,
			gantries:[
				{ head:{
						spindles:[
							{name:"L",on:true,pos:200},
							{"name":"R","on":true,"pos":200}
						],
						angle:0
					},
					name:"G",
					axis:{name:"G",posMax:200,pos:20,jog:2,calibrate:false}
				}
			],
			trayFeeders:[
				{name:"T", axis:{posMax:300,"pos":30,"jog":3,"calibrate":false}}
			],
			pcbFeeders:[
			  {name:"P", axis:{posMax:400,"pos":40,"jog":4,"calibrate":false}}
			]}); 

		var state2 = new org.firepick.firemote.MachineState(json);
		expect(state2.gantries[0].head.spindles[0].name).toBe("L");
		expect(state2.gantries[0].head.spindles[1].name).toBe("R");
		expect(state2.gantries[0].axis.posMax).toBe(200);
		expect(state2.gantries[0].axis.pos).toBe(20);
		expect(state2.gantries[0].axis.jog).toBe(2);
		expect(state2.gantries[0].name).toBe("G");
		expect(state2.trayFeeders[0].name).toBe("T");
		expect(state2.trayFeeders[0].axis.pos).toBe(30);
		expect(state2.trayFeeders[0].axis.posMax).toBe(300);
		expect(state2.trayFeeders[0].axis.jog).toBe(3);
		expect(state2.pcbFeeders[0].name).toBe("P");
		expect(state2.pcbFeeders[0].axis.posMax).toBe(400);
		expect(state2.pcbFeeders[0].axis.pos).toBe(40);
		expect(state2.pcbFeeders[0].axis.jog).toBe(4);
		expect(state2.stateId).toBe(123);
		expect(state2.message).toBe("M");
	}));

});
