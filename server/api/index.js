const router = require('express').Router();

const jwt = require('jsonwebtoken');
const { uploadImg } = require('../libs/file/uploads');

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
		const token = authHeader.split(' ')[1];

		// console.log('authHeader: ', token);

		jwt.verify(token, config.jwtSecret, (err, user) => {
			if (err) {
				res.status(403).json({
					message: 'Доступ запрещен',
				});

				console.log('err::::', err);
			}

			req.user = user;
			console.log('user::::', user.id);

			next();
		});
	} else {
		res.status(401).json({
			message: 'Для просмотра содержимого необходимо авторизоватся',
		});
	}
};

module.exports = (app) => {
	router.post('/routes', routes.getRoutes);
	router.post('/routes/add', authenticateJWT, routes.validRoute(), routes.addRoute);
	router.post('/routes/del', authenticateJWT, routes.validRoute(), routes.delRoute);
	router.post('/routes/upd', authenticateJWT, routes.validRoute(), routes.updRoute);
	router.post('/route/:id', authenticateJWT, routes.getRoute);

	router.post('/containers', authenticateJWT, containers.getContainers);

	router.post('/users', authenticateJWT, users.getUsers);
	router.post('/users/register', users.validRegister(), users.register);
	router.post('/users/auth', users.validAuth(), users.auth);
	router.post('/users/changePassword', authenticateJWT, users.changePassword);
	router.post('/users/checkoutToken', authenticateJWT, users.checkoutToken);
	router.post('/users/uploadPhoto', [authenticateJWT, uploadImg], users.uploadPhoto);
	router.post('/users/changeFIO', authenticateJWT, users.changeFIO);
	router.post('/user/:id', authenticateJWT, users.getUser);

	router.post('/posts', posts.getPostsLimit);
	router.post('/posts/count', posts.getPostsCount);
	router.post('/posts/add', authenticateJWT, posts.addPost);
	router.post('/posts/upd', authenticateJWT, posts.updPost);
	router.post('/posts/del', authenticateJWT, posts.delPost);
	router.post('/post/:id', posts.getPost);

	router.post('/comments/add', authenticateJWT, comments.addComment);
	router.post('/comments/del', authenticateJWT, comments.delComment);
	router.post('/comments/post/del', authenticateJWT, comments.delCommentsByPostId);
	router.post('/comments/post/:id', authenticateJWT, comments.getCommentsByPostId);

	router.post('/headerNav', headerNav.getHeaderNav);

	app.use('/api', router);
};
