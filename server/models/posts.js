const db = require('../libs/db');

exports.getAllCount = (req, res) => {
	const sql = 'SELECT count(*) as count FROM posts';

	return db
		.execQuery(sql)
		.then((data) => {
			console.log(data);
			res.json(data);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				message: err,
			});
		});
};

exports.getAllLimit = (req, res, limit) => {
	const sql = 'SELECT * FROM posts LIMIT :start,:end';

	return db
		.execQuery(sql, { start: limit.start, end: limit.end })
		.then((data) => {
			console.log(data);
			res.json(data);
		})
		.catch((err) => {
			console.error(err);
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
			console.error(err);
			res.status(500).json({
				message: err,
			});
		});
};

exports.getById = (req, res) => {
	const post = {
		id: req.params.id,
	};

	return db
		.execQuery('SELECT * FROM posts WHERE id = :id', { id: post.id })
		.then((data) => {
			if (data.length) { res.json(data); } else {
				res.status(400).json({
					message: `Not found id=${post.id}`,
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

exports.add = (req, res, post) => db
	.execQuery(
		'INSERT INTO posts (title, subtitle, text, created) VALUES(:title, :subtitle, :text, :created)',
		{
			title: post.title,
			subtitle: post.subtitle,
			text: post.text,
			created: post.created,
		},
	)
	.then((data) => {
		res.json(true);
	})
	.catch((err) => {
		console.error(err);
		res.status(500).json({
			message: err,
		});
	});
