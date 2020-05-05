const db = require('../libs/db');

exports.getAll = (req, res) => {
	const sql = 'SELECT * FROM comments';

	return db
		.execQuery(sql)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.getByPostId = (req, res) => {
	const comments = {
		post_id: req.params.id,
	};

	const sql = 'SELECT * FROM comments WHERE post_id = :post_id';

	return db
		.execQuery(sql, { post_id: comments.post_id })
		.then((data) => {
			if (data.length) { res.json(data); } else {
				res.status(400).json({
					message: `Not found comments post_id=${comments.post_id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.delByPostId = (req, res) => {
	const comments = {
		post_id: req.body.id,
	};

	const sql = 'DELETE FROM comments WHERE post_id = :post_id';

	console.log(comments);

	return db
		.execQuery(sql, { post_id: comments.post_id })
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.add = (req, res) => {
	const comment = {
		post_id: req.body.post_id,
		parent_id: req.body.parent_id,
		type: 'post',
		author: req.body.author,
		message: req.body.message,
	};

	const sql = 'INSERT INTO comments (post_id, parent_id, type, author, message) VALUES(:post_id, :parent_id, :type, :author, :message)';

	return db
		.execQuery(sql,
			{
				post_id: comment.post_id,
				parent_id: comment.parent_id,
				type: comment.type,
				author: comment.author,
				message: comment.message,
			})
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.del = (req, res) => {
	const comment = {
		id: req.body.id,
	};

	const sql = 'DELETE FROM comments WHERE id = :id';

	return db
		.execQuery(sql, { id: comment.id })
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};
