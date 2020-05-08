const router = require('express').Router();

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');


const routes = require('./routes');
const containers = require('./containers');
const comments = require('./comments');
const users = require('./users');
const posts = require('./posts');
const uploads = require('./uploads');


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().split(' ').join('-');
		console.log('filename', fileName);
		cb(null, `${uuidv4()}-${fileName}`);
	},
});

const upload = multer({
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

module.exports = (app) => {
	router.post('/routes', routes.getRoutes);
	router.post('/routes/add', routes.validRoute(), routes.addRoute);
	router.post('/routes/del', routes.validRoute(), routes.delRoute);
	router.post('/routes/upd', routes.validRoute(), routes.updRoute);
	router.post('/route/:id', routes.getRoute);

	router.post('/containers', containers.getContainers);

	router.post('/users', users.getUsers);
	router.post('/users/register', users.validRegister(), users.register);
	router.post('/users/auth', users.validAuth(), users.auth);
	router.post('/user/:id', users.getUser);

	router.post('/posts', posts.getPostsLimit);
	router.post('/posts/count', posts.getPostsCount);
	router.post('/posts/add', posts.addPost);
	router.post('/posts/del', posts.delPost);
	router.post('/post/:id', posts.getPost);

	router.post('/comments/add', comments.addComment);
	router.post('/comments/del', comments.delComment);
	router.post('/comments/post/del', comments.delCommentsByPostId);
	router.post('/comments/post/:id', comments.getCommentsByPostId);

	router.post('/uploads/add', upload.single('profileImg'), uploads.uploadFile);
	router.post('/uploads/del', uploads.delFile);

	app.use('/api', router);
};
