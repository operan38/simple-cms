const router = require('express').Router();

const routes = require('../models/routes');
const containers = require('../models/containers');
const comments = require('../models/comments');
const users = require('./users');
const posts = require('./posts');

module.exports = (app) => {
	router.post('/routes', routes.getAll);
	router.post('/routes/add', routes.add);
	router.post('/routes/del', routes.del);
	router.post('/routes/upd', routes.upd);
	router.post('/route/:id', routes.getById);

	router.post('/containers', containers.getAll);

	router.post('/users', users.getUsers);
	router.post('/users/register', users.validRegister(), users.register);
	router.post('/users/auth', users.validLogin(), users.auth);
	router.post('/user/:id', users.getUser);

	router.post('/posts', posts.getPostsLimit);
	router.post('/posts/count', posts.getPostsCount);
	router.post('/posts/add', posts.addPost);
	router.post('/posts/del', posts.delPost);
	router.post('/post/:id', posts.getPost);

	router.post('/comments/posts/add', comments.add);
	router.post('/comments/post/:id', comments.getByPostId);

	app.use('/api', router);
};
