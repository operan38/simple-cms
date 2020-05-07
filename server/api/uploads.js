const fs = require('fs');

exports.uploadFile = (req, res, next) => {
	const url = `${req.protocol}://${req.get('host')}`;
	return res.send(url);
};

exports.delFile = (req, res, next) => {
	fs.stat('./server/uploads/21e104e4-76fa-4929-9bc5-7858980a5777-4.png', (err, stats) => {
		console.log(stats);// here we got all information of file in stats variable

		if (err) {
			res.send(err);
		} else {
			fs.unlink('./server/uploads/21e104e4-76fa-4929-9bc5-7858980a5777-4.png', (err) => {
				if (err) return res.send(err);
				console.log('file deleted successfully');
				return res.send('file deleted successfully');
			});
		}
	});
};
