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
	const post = {
		id: req.params.id,
	};

	return db
		.execQuery('SELECT * FROM comments WHERE post_id = :id', { id: post.id })
		.then((data) => {
			if (data.length) { res.json(data); } else {
				res.status(400).json({
					message: `Not found comments post_id=${post.id}`,
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
