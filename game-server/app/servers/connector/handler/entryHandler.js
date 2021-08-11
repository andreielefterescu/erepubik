module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

function zeros(value) {
	let maxNrOf0 = -1;
	let tmp = 0;

	while (value !== 0) {
		if ((value & 1) === 0 ) {
			tmp += 1;
			value >>= 1;
			maxNrOf0 = Math.max(maxNrOf0, tmp);
		} else {
			maxNrOf0 = Math.max(maxNrOf0, tmp);
			tmp = 0;
			value >>= 1;
		}
	}
	return maxNrOf0;
}

// alternative.. but wip
function zeros2(value) {
	value = parseInt(value);
	const binStr = value.toString(2);
	const mask = 2 ** binStr.length - 1;
	let inverted = ~value & mask;

	let count = 0;
	while (inverted) {
		inverted = inverted & (inverted << 1);
		count++;
	}
	return count;
}

/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.entry = function(msg, session, next) {
  next(null, { code: 200, msg });
};

Handler.prototype.binary = function(value, session, next) {
	next(null, { code: 200, msg: `Binary Value: ${parseInt(value).toString(2)}. Max number of zeros: ${zeros(value)} | ${zeros2(value)}` });
};

/**
 * Publish route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.publish = function(msg, session, next) {
	var result = {
		topic: 'publish',
		payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
	};
  next(null, result);
};

/**
 * Subscribe route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.subscribe = function(msg, session, next) {
	var result = {
		topic: 'subscribe',
		payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
	};
  next(null, result);
};
