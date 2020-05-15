const { check, validationResult } = require('express-validator');
const postsModel = require('../models/posts');

exports.addPost = async (req, res) => {
	try {
		const post = {
			title: req.body.title,
			subtitle: req.body.subtitle,
			text: req.body.text,
		};
		const result = await postsModel.add(post);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
		});
	}
};

exports.delPost = async (req, res) => {
	try {
		const post = {
			id: req.body.id,
		};
		const result = await postsModel.del(post);
		if (post.id) {
			return res.json(result);
		}

		return res.status(400).json({
			message: 'Not found id',
		});
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
		});
	}
};

exports.updPost = async (req, res) => {
	try {
		const post = {
			id: req.body.id,
			title: req.body.title,
			subtitle: req.body.subtitle,
			text: req.body.text,
		};
		const result = await postsModel.upd(post);
		if (post.id) {
			return res.json(result);
		}

		return res.status(400).json({
			message: 'Not found id',
		});
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
		});
	}
};

exports.getPost = async (req, res) => {
	try {
		const post = {
			id: req.params.id,
		};
		const result = await postsModel.getById(post);

		if (result.length !== 0) {
			return res.json(result[0]);
		}

		return res.status(400).json({
			message: `Not found id=${post.id}`,
		});
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
		});
	}
};

exports.getPosts = async (req, res) => {
	try {
		const result = await postsModel.getAll();
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
		});
	}
};

exports.getPostsCount = async (req, res) => {
	try {
		const result = await postsModel.getAllCount();

		return res.json(result[0].count);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
		});
	}
};

exports.getPostsLimit = async (req, res) => {
	try {
		const post = {
			limit: req.body.limit,
			offset: req.body.offset,
		};

		const result = await postsModel.getAllLimit(post);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
		});
	}
};
