///<reference path='../../include.d.ts'/>
module firemote {
	export class DeltaFactory {
		constructor(obj) {
		}

		clone(): DeltaFactory {
			return new DeltaFactory(this);
		}

		diff(obj1, obj2) {
			var result = {};
			var changes: number = 0;
			if (typeof obj1 === 'undefined') return "diff(undefined,...)";
			if (typeof obj2 === 'undefined') return "diff(obj,undefined)";
			if (typeof obj1 !== typeof obj2) return "diff(type != type)";
			if (obj1 instanceof Array) {
			  return this.diffArray(obj1, obj2);
			}
			for (var k in obj1) {
				var val1 = obj1[k];
				var val2 = obj2[k];
				if (typeof val1 !== typeof val2) {
						result[k] = val2;
						changes++;
				} else if (val1 instanceof Array) {
					var arrDiff = this.diffArray(val1, val2);
					if (arrDiff) {
						result[k] = arrDiff;
						changes++;
					}
				} else {
					if (val1 !== val2) {
					  if (typeof val1 === 'number' || typeof val1 === 'string') {
							result[k] = val2;
							changes++;
						} else {
						  var diffVal = this.diff(val1, val2);
							if (diffVal) {
							  result[k] = diffVal;
								changes++;
							}
						}
					}
				}
			}
			for (var k in obj2) {
				var val1 = obj1[k];
				var val2 = obj2[k];
				if (typeof val1 === 'undefined') {
				  result[k] = val2;
					changes++;
				}
			}
			return changes > 0 ? result : false;
		}

		diffArray(arr1, arr2) {
			var result = [];
			var changes: number = 0;
			for (var i = 0; i < arr1.length; i++) {
			  var val1 = arr1[i];
			  var val2 = arr2[i];
			  if (typeof val1 !== typeof val2) {
					changes++;
					result.push(diffResult);
				} else if (val1 === val2) {
				  result.push(undefined);
				} else if (typeof val1 === 'number' || typeof val1 === 'string') {
					changes++;
				  result.push(val2);
				} else {
					var diffResult = this.diff(val1, val2);
					if (diffResult) {
						changes++;
						result.push(diffResult);
					} else {
						result.push(undefined);
					}
				}
			}
			if (changes === 0) {
				return false;
			}
			return result;
		}



	}
}

exports.DeltaFactory = firemote.DeltaFactory;
