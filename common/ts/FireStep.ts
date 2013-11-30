///<reference path='../../include.d.ts'/>
module firemote {
	export class FireStep {
			vel: number = 0;	// [vel]  velocity           - actual velocity - may be different than programmed feed rate 
		  feed: number = 0; // [feed] feed_rate          - gcode programmed feed rate (F word) 
			stat: number = 0; // [stat] machine_state      - 0=initializing, 1=ready, 2=shutdown, 3=stop, 4=end, 5=run, 6=hold, 9=homing 
			//unit: number = 0; // [unit] units_mode         - 0=inch, 1=mm
		  coor: number = 0; // [coor] coordinate_system  - 0=g53, 1=g54, 2=g55, 3=g56, 4=g57, 5=g58, 6=g59
			momo: number = 0; // [momo] motion_mode        - 0=traverse, 1=straight feed, 2=cw arc, 3=ccw arc
			//plan: number = 0; // [plan] plane_select       - 0=XY plane, 1=XZ plane, 2=YZ plane
			path: number = 0; // [path] path_control_mode  - 0=exact stop, 1=exact path, 2=continuous
			dist: number = 0; // [dist] distance_mode      - 0=absolute distance, 1=incremental distance
			//frmo: number = 0; // [frmo] feed_rate_mode     - 0=units-per-minute-mode, 1=inverse-time-mode
			hold: number = 0; // [hold] hold_state         - 0=off, 1=sync, 2=plan, 3=decel, 4=holding, 5=end-hold

			posx: number = 0; // [posx] x work position    - X work position in prevailing units (mm or inch) 
			posy: number = 0; // [posy] y work position        Reports position in current coordinate system
			posz: number = 0; // [posz] z work position        and with any G92 offsets in effect
			posa: number = 0; // [posa] a work position
			//posb: number = 0; // [posb] b work position
			//posc: number = 0; // [posc] c work position

			mpox: number = 0; // [mpox] x machine position - X machine position in absolute coordinates in mm units ONLY
			mpoy: number = 0; // [mpoy] y machine position     Reports the internal canonical position which is 
			mpoz: number = 0; // [mpoz] z machine position     always in mm and absolute machine coordinates (G53)
			mpoa: number = 0; // [mpoa] a machine position     Note that no coordinate systems or g92 offsets are applied
			//mpob: number = 0; // [mpob] b machine position
			//mpoc: number = 0; // [mpoc] c machine position

			//ofsx: number = 0; // [ofsx] x machine offset   - X machine offset to work position in absolute coordinates in mm units ONLY
			//ofsy: number = 0; // [ofsy] y machine offset       Reports offsets in mm and absolute machine coordinates 
			//ofsz: number = 0; // [ofsz] z machine offset
			//ofsa: number = 0; // [ofsa] a machine offset
			//ofsb: number = 0; // [ofsb] b machine offset
			//ofsc: number = 0; // [ofsc] c machine offset

			//g54x: number = 0; // [g54x] g54x               - G54 coordinate system offset for X axis
			//g54y: number = 0; // [g54y] g54y                   Coordinate system offsets may be reported
			//g54z: number = 0; // [g54z] g54z
			//...
			//g59a: number = 0; // [g59a] g59a
			//g59b: number = 0; // [g59b] g59b
			//g59c: number = 0; // [g59c] g59c

			//g92x: number = 0; // [g92x] g92x               - G92 origin offset for X axis
			//g92y: number = 0; // [g92y] g92y                   The number returned can be a bit brain bending as you have to back out 
			//g92z: number = 0; // [g92z] g92z                   the position from which the G92 was set, but this is the actual offset 
			//g29a: number = 0; // [g29a] g92a                   value; and may be different from the value entered in the G92 command.
			//g92b: number = 0; // [g92b] g92b
			//g92c: number = 0; // [g92c] g92c

			constructor(obj = undefined) {
				if (typeof obj === 'string') {
				  obj = JSON.parse(obj);
				}
				if (typeof obj !== 'undefined') {
				  for (var k in this) {
					   if (typeof this[k] === 'number') {
						   this[k] = obj[k];
						 }
					}
				}
			}

			clone(): FireStep {
				return new FireStep(this);
			}
	}
}

exports.FireStep = firemote.FireStep;
