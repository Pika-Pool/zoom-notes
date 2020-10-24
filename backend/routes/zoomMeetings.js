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

// render meeting form to get data
router.get('/meeting', (req, res, next) => {
	res.render('meetingForm.pug');
});

// actual zoom meeting rendered
router.post('/meeting', (req, res, next) => {
	const { meetingNumber, userName, role, passWord } = req.body;
	const signature = generateSignature(
		process.env.API_KEY,
		process.env.API_SECRET,
		meetingNumber,
		role
	);

	const meetingConfig = {
		signature,
		apiKey: process.env.API_KEY,
		meetingNumber,
		userName,
		role,
		passWord,
		leaveUrl: `${req.protocol}://${req.get('host')}/zoom/meeting`,
	};
	
	res.render('meeting.pug', {
		meetingConfigString: `${JSON.stringify(meetingConfig)}`,
	});
});

module.exports = router;
