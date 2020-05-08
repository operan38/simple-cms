const fs = require('fs');
const users = require('../models/users');

exports.uploadFile = async (req, res, next) => {
	const url = `${req.protocol}://${req.get('host')}`;

	const user = {
		id: req.body.id,
		mainPhoto: `/uploads/${req.file.filename}`,
	};

	const resulst = await users.updMainPhoto(req, res, user);
	return res.send(resulst);
};

exports.delFile = (req, res, next) => {
	fs.stat('./uploads/21e104e4-76fa-4929-9bc5-7858980a5777-4.png', (err, stats) => {
		console.log(stats);// here we got all information of file in stats variable

		if (err) {
			res.send(err);
		} else {
			fs.unlink('./uploads/21e104e4-76fa-4929-9bc5-7858980a5777-4.png', (err) => {
				if (err) return res.send(err);
				console.log('file deleted successfully');
				return res.send('file deleted successfully');
			});
		}
	});
};
