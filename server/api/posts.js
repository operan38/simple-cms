const posts = require('../models/posts');

exports.addPost = async (req, res) => {
	const {
		title, subtitle, text, created,
	} = req.body;

	const user = {
		title, subtitle, text, created,
	};

	posts.add(req, res, user);

	return res.status(201).json();
};

exports.getPost = async (req, res) => {
	const post = posts.getById(req, res);
	return post;
};

exports.getPosts = async (req, res) => {
	const postsList = posts.getAll(req, res);
	return postsList;
};
