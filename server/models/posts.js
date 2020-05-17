const db = require('../libs/db');

exports.getAllCount = () => {
	const sql = 'SELECT count(*) as count FROM posts';

	return db
		.execQuery(sql)
		.then((data) => data)
		.catch((err) => err);
};

exports.getAll = () => {
	const sql = 'SELECT * FROM posts';

	return db
		.execQuery(sql)
		.then((data) => data)
		.catch((err) => err);
};

exports.getAllLimit = (post) => {
	const sql = 'SELECT * FROM posts LIMIT :offset,:limit';

	return db
		.execQuery(sql, { limit: post.limit, offset: post.offset })
		.then((data) => data)
		.catch((err) => err);
};

exports.getById = (post) => {
	const sql = 'SELECT * FROM posts WHERE id = :id';

	return db
		.execQuery(sql, { id: post.id })
		.then((data) => data)
		.catch((err) => err);
};

exports.add = (post) => {
	const sql = 'INSERT INTO posts (title, subtitle, text) VALUES(:title, :subtitle, :text)';

	return db.execQuery(
		sql,
		{
			title: post.title,
			subtitle: post.subtitle,
			text: post.text,
		},
	)
		.then((data) => data)
		.catch((err) => err);
};

exports.del = (post) => {
	const sql = 'DELETE FROM posts WHERE id = :id';

	return db
		.execQuery(sql, { id: post.id })
		.then((data) => data)
		.catch((err) => err);
};

exports.upd = (post) => {
	const sql = 'UPDATE posts SET title = :title, subtitle = :subtitle, text = :text, updated = :updated WHERE id = :id';

	return db
		.execQuery(sql,
			{
				id: post.id,
				title: post.title,
				subtitle: post.subtitle,
				text: post.text,
				updated: post.updated,
			})
		.then((data) => data)
		.catch((err) => err);
};
