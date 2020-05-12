const { check, validationResult } = require('express-validator');
const postsModel = require('../models/posts');

exports.validPost = () => [];

exports.addPost = async (req, res) => {
	try {
		const post = {
			title: req.body.title,
			subtitle: req.body.subtitle,
			text: req.body.text,
		};
		const result = await postsModel.add(req, res, post);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.delPost = async (req, res) => {
	try {
		const post = {
			id: req.body.id,
		};
		const result = await postsModel.del(req, res, post);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
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
		const result = await postsModel.upd(req, res, post);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.getPost = async (req, res) => {
	try {
		const post = {
			id: req.params.id,
		};
		const result = await postsModel.getById(req, res, post);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.getPosts = async (req, res) => {
	try {
		const result = await postsModel.getAll(req, res);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.getPostsCount = async (req, res) => {
	try {
		const result = await postsModel.getAllCount(req, res);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.getPostsLimit = async (req, res) => {
	try {
		const post = {
			limit: req.body.limit,
			offset: req.body.offset,
		};

		/* const { admin } = req.user;
		if (admin === 0) {
			return res.status(403).json({
				message: 'Доступ запрещен',
			});
		} */

		const result = await postsModel.getAllLimit(req, res, post);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};
