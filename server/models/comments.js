const db = require('../libs/db');

exports.getAll = (req, res) => {
	const sql = 'SELECT * FROM comments';

	return db
		.execQuery(sql)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				message: err,
			});
		});
};

exports.getByPostId = (req, res) => {
	const comments = {
		post_id: req.params.id,
	};

	return db
		.execQuery('SELECT * FROM comments WHERE post_id = :post_id', { post_id: comments.post_id })
		.then((data) => {
			if (data.length) { res.json(data); } else {
				res.status(400).json({
					message: `Not found comments post_id=${comments.post_id}`,
				});
			}
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				message: err,
			});
		});
};

exports.add = (req, res) => {
	console.log(req.body);

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
			res.json(true);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				message: err,
			});
		});
};
