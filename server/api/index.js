const router = require('express').Router();

const jwt = require('jsonwebtoken');
const { uploadImg } = require('../libs/uploads');

const config = require('../config');
const routes = require('./routes');
const containers = require('./containers');
const comments = require('./comments');
const users = require('./users');
const posts = require('./posts');
const headerNav = require('./headerNav');

const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		// const token = authHeader.split(' ')[1];
		const token = authHeader;

		console.log('authHeader: ', token);

		jwt.verify(token, config.jwtSecret, (err, user) => {
			if (err) {
				return res.status(403).json({
					message: 'Доступ запрещен',
				});
			}

			req.user = user;

			console.log('user::::', user);

			return next();
		});
	} else {
		return res.status(401);
	}
};

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
	router.post('/users/changePassword', users.changePassword);
	router.post('/users/checkoutToken', users.checkoutToken);
	router.post('/users/uploadPhoto', uploadImg.single('profileImg'), users.uploadPhoto);
	router.post('/users/delPhoto', users.delPhoto);
	router.post('/users/changeFIO', users.changeFIO);
	router.post('/user/:id', users.getUser);

	router.post('/posts', authenticateJWT, posts.getPostsLimit);
	router.post('/posts/count', posts.getPostsCount);
	router.post('/posts/add', posts.addPost);
	router.post('/posts/upd', posts.updPost);
	router.post('/posts/del', posts.delPost);
	router.post('/post/:id', posts.getPost);

	router.post('/comments/add', comments.addComment);
	router.post('/comments/del', comments.delComment);
	router.post('/comments/post/del', comments.delCommentsByPostId);
	router.post('/comments/post/:id', comments.getCommentsByPostId);

	router.post('/headerNav', headerNav.getHeaderNav);

	app.use('/api', router);
};
