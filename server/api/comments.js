const comments = require('../models/comments');

exports.getPostComments = async (req, res) => {
	try {
		const commentsList = await comments.getByPostId(req, res);
		return res.json(commentsList);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};

exports.addComment = async (req, res) => {
	try {
		const comment = await comments.add(req, res);
		return res.json(comment);
	} catch (err) {
		return res.status(500).json({
			message: `Что то пошло не так, попробуйте снова: ${err}`,
		});
	}
};
