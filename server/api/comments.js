const commentsModel = require('../models/comments');

exports.getCommentsByPostId = async (req, res) => {
	try {
		const comment = {
			post_id: req.params.id,
		};
		const result = await commentsModel.getByPostId(comment);
		if (comment.post_id) {
			return res.json(result);
		}

		return res.status(400).json({
			message: 'Not found post_id',
		});
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
		});
	}
};

exports.delCommentsByPostId = async (req, res) => {
	try {
		const comment = {
			post_id: req.body.id,
		};
		const result = await commentsModel.delByPostId(comment);
		if (comment.post_id) {
			return res.json(result);
		}

		return res.status(400).json({
			message: 'Not found post_id',
		});
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
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
		const result = await commentsModel.add(comment);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: (${err})`,
		});
	}
};

exports.delComment = async (req, res) => {
	try {
		const comment = {
			id: req.body.id,
		};
		const result = await commentsModel.del(comment);
		if (comment.id) {
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
