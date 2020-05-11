const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().split(' ').join('-');
		console.log('fileName', fileName);
		cb(null, `${uuidv4()}-${fileName}`);
	},
});

const uploadImg = multer({
	storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
			cb(null, true);
			return true;
		}
		cb(null, false);
		return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
	},
});

module.exports = { uploadImg };
