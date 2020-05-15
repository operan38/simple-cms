const db = require('../libs/db');

exports.getAll = () => {
	const sql = 'SELECT * FROM comments';

	return db
		.execQuery(sql)
		.then((data) => data)
		.catch((err) => err);
};

exports.getByPostId = (comments) => {
	const sql = 'SELECT * FROM comments WHERE post_id = :post_id';

	return db
		.execQuery(sql, { post_id: comments.post_id })
		.then((data) => data)
		.catch((err) => err);
};

exports.delByPostId = (comments) => {
	const sql = 'DELETE FROM comments WHERE post_id = :post_id';

	return db
		.execQuery(sql, { post_id: comments.post_id })
		.then((data) => data)
		.catch((err) => err);
};

exports.add = (comment) => {
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
		.then((data) => data)
		.catch((err) => err);
};

exports.del = (comment) => {
	const sql = 'DELETE FROM comments WHERE id = :id';

	return db
		.execQuery(sql, { id: comment.id })
		.then((data) => data)
		.catch((err) => err);
};
