const crypto = require('crypto');

/**
 * @returns {String} signature - zoom meeting JWT signature
 * @param {String} apiKey - JWT app api key
 * @param {String} apiSecret JWT app api secret
 * @param {String} meetingNumber
 * @param {Number} role 0 for host, 1 for attendee
 */
module.exports.generateSignature = function (
	apiKey,
	apiSecret,
	meetingNumber,
	role
) {
	// Prevent time sync issue between client signature generation and zoom
	const timestamp = new Date().getTime() - 30000;
	const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
		'base64'
	);
	const hash = crypto
		.createHmac('sha256', apiSecret)
		.update(msg)
		.digest('base64');
	const signature = Buffer.from(
		`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
	).toString('base64');

	return signature;
};
