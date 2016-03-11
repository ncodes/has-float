var _ = require("lodash");

/**
 * Checks if a json object has a floating point value
 * withing it. It will check objects, arrays and numbers.
 * @param  {object}  obj json object or list of json objects
 * @return {Boolean}     true if a float value is found
 */
module.exports = hasFloatValue(obj) {

	// expect only json object
	if (!_.isPlainObject(obj)) return new Error("expected json object")

	return (function func(obj) {

		// if object is a number and it is not an integer, it's float
		if (_.isNumber(obj) && !_.isInteger(obj)) return true;

		// it's an array
		if (_.isArray(obj)) {
			var hasFloat = false;
			_.each(obj, function(o){
				if (func(o)) {
					hasFloat = true;
					return false;
				}
			});
			return hasFloat;
		}

		// it's an object
		if (_.isPlainObject(obj)) {
			var keys = Object.keys(obj);
			for (var i = 0; i < keys.length; i++) {
				if (func(obj[keys[i]])) {
					return true;
				}
			}
		}

		return false;

	})(obj)
}