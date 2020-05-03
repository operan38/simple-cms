const posts = require('../models/posts');

exports.addPost = (req, res) => {
	const {
		title, subtitle, text, created,
	} = req.body;

	const user = {
		title, subtitle, text, created,
	};

	posts.add(req, res, user);

	return res.status(201).json();
};

exports.delPost = (req, res) => {
	posts.del(req, res);
	return res.status(200).json();
};

exports.getPost = (req, res) => {
	const post = posts.getById(req, res);
	return post;
};

exports.getPosts = (req, res) => {
	const postsList = posts.getAll(req, res);
	return postsList;
};

exports.getPostsCount = (req, res) => {
	const count = posts.getAllCount(req, res);
	return count;
};

exports.getPostsLimit = (req, res) => {
	const postsList = posts.getAllLimit(req, res);
	return postsList;
};
