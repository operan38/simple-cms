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

exports.getAllLimit = (req, res) => {
	const posts = {
		limit: req.body.limit,
		offset: req.body.offset,
	};

	const sql = 'SELECT * FROM posts LIMIT :offset,:limit';

	return db
		.execQuery(sql, { limit: posts.limit, offset: posts.offset })
		.then((data) => {
			res.json(data);
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

exports.getById = (req, res) => {
	const post = {
		id: req.params.id,
	};

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

exports.add = (req, res) => {
	const post = {
		title: req.body.title,
		subtitle: req.body.subtitle,
		text: req.body.text,
		created: req.body.created,
	};

	const sql = 'INSERT INTO posts (title, subtitle, text, created) VALUES(:title, :subtitle, :text, :created)';

	db.execQuery(
		sql,
		{
			title: post.title,
			subtitle: post.subtitle,
			text: post.text,
			created: post.created,
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

exports.del = (req, res) => {
	const post = {
		id: req.body.id,
	};

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
