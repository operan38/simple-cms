const { check, validationResult } = require('express-validator');
const posts = require('../models/posts');

exports.validPost = () => [];

exports.addPost = async (req, res) => {
	try {
		const post = await posts.add(req, res);
		return res.json(post);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.delPost = async (req, res) => {
	try {
		const post = await posts.del(req, res);
		return res.json(post);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.getPost = async (req, res) => {
	try {
		const post = await posts.getById(req, res);
		return res.json(post);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.getPosts = async (req, res) => {
	try {
		const postsList = await posts.getAll(req, res);
		return res.json(postsList);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.getPostsCount = async (req, res) => {
	try {
		const postsList = await posts.getAllCount(req, res);
		return res.json(postsList);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.getPostsLimit = async (req, res) => {
	try {
		const postsList = await posts.getAllLimit(req, res);
		return res.json(postsList);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};
