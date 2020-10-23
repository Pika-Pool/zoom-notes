const router = require('express').Router();
const { generateSignature } = require('../lib/zoomUtils');

// sends the signature for a zoom meeting
router.post('/signature', (req, res, next) => {
	const signature = generateSignature(
		process.env.API_KEY,
		process.env.API_SECRET,
		req.body.meetingNumber,
		req.body.role
	);

	res.json({ signature });
});

module.exports = router;
