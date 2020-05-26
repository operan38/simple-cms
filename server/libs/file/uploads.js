const multer = require('multer');
const fs = require('fs');

const uploadImg = multer({
	/* storage, */
	limits: { fileSize: 4 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
			cb(null, true);
			return true;
		}
		cb(null, false);
		return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
	},
}).single('profileImg');

const delFile = async (path) => {
	fs.stat(`.${path}`, (err, stats) => {
		console.log('stats: ', stats);// here we got all information of file in stats variable

		fs.unlink(`.${path}`, (errLink) => {
			if (errLink) return console.log(errLink);
			return console.log('file deleted successfully');
		});

		return err;
	});
};

module.exports = { uploadImg, delFile };
