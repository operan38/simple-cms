const commentsModel = require('../models/comments');

exports.getCommentsByPostId = async (req, res) => {
	try {
		const comment = {
			post_id: req.params.id,
		};
		const result = await commentsModel.getByPostId(req, res, comment);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.delCommentsByPostId = async (req, res) => {
	try {
		const comment = {
			post_id: req.body.id,
		};
		const result = await commentsModel.delByPostId(req, res, comment);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.addComment = async (req, res) => {
	try {
		const comment = {
			post_id: req.body.post_id,
			parent_id: req.body.parent_id,
			type: 'post',
			author: req.body.author,
			message: req.body.message,
		};
		const result = await commentsModel.add(req, res, comment);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.delComment = async (req, res) => {
	try {
		const comment = {
			id: req.body.id,
		};
		const result = await commentsModel.del(req, res, comment);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};
