const router = require('express').Router();

const routes = require('./routes');
const containers = require('./containers');
const comments = require('./comments');
const users = require('./users');
const posts = require('./posts');

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
	router.post('/comments/post/:id', comments.getPostComments);

	app.use('/api', router);
};
