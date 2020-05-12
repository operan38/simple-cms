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

exports.getByPostId = (req, res, comments) => {
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

exports.delByPostId = (req, res, comments) => {
	const sql = 'DELETE FROM comments WHERE post_id = :post_id';

	return db
		.execQuery(sql, { post_id: comments.post_id })
		.then((data) => {
			if (comments.post_id) {
				res.json(data);
			} else {
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

exports.add = (req, res, comment) => {
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

exports.del = (req, res, comment) => {
	const sql = 'DELETE FROM comments WHERE id = :id';

	return db
		.execQuery(sql, { id: comment.id })
		.then((data) => {
			if (comment.id) {
				res.json(data);
			} else {
				res.status(400).json({
					message: `Not found id=${comment.id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};
