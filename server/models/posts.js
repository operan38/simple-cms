const db = require('../libs/db');

exports.getAllCount = (req, res) => {
	const sql = 'SELECT count(*) as count FROM posts';

	return db
		.execQuery(sql)
		.then((data) => {
			res.json(data[0].count);
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.getAll = (req, res) => {
	const sql = 'SELECT * FROM posts';

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

exports.getAllLimit = (req, res, post) => {
	const sql = 'SELECT * FROM posts LIMIT :offset,:limit';

	return db
		.execQuery(sql, { limit: post.limit, offset: post.offset })
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.getById = (req, res, post) => {
	const sql = 'SELECT * FROM posts WHERE id = :id';

	return db
		.execQuery(sql, { id: post.id })
		.then((data) => {
			if (data.length) { res.json(data[0]); } else {
				res.status(400).json({
					message: `Not found id=${post.id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.add = (req, res, post) => {
	const sql = 'INSERT INTO posts (title, subtitle, text) VALUES(:title, :subtitle, :text)';

	db.execQuery(
		sql,
		{
			title: post.title,
			subtitle: post.subtitle,
			text: post.text,
		},
	)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.del = (req, res, post) => {
	const sql = 'DELETE FROM posts WHERE id = :id';

	return db
		.execQuery(sql, { id: post.id })
		.then((data) => {
			if (post.id) {
				res.json(data);
			} else {
				res.status(400).json({
					message: `Not found id=${post.id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.upd = (req, res, post) => {
	const sql = 'UPDATE posts SET title = :title, subtitle = :subtitle, text = :text WHERE id = :id';

	return db
		.execQuery(sql,
			{
				id: post.id, title: post.title, path: post.path, container_id: post.container_id,
			})
		.then((data) => {
			if (post.id) {
				res.json(data);
			} else {
				res.status(400).json({
					message: `Not found id=${post.id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};
