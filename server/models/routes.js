const db = require('../libs/db');

exports.getOnlyAll = () => db.execQuery('SELECT * FROM routes');

exports.getAll = () => {
	const sql = `SELECT routes.id as id, routes.title as title, routes.path as path, 
    containers.id as container_id, containers.title as container_title, containers.path as container_path
    FROM routes JOIN containers ON routes.container_id = containers.id`;

	return db
		.execQuery(sql)
		.then((data) => data)
		.catch((err) => err);
};

exports.getById = (route) => {
	const sql = 'SELECT * FROM routes WHERE id = :id';

	return db
		.execQuery(sql, { id: route.id })
		.then((data) => data)
		.catch((err) => err);
};

exports.upd = (route) => {
	const sql = 'UPDATE routes SET title = :title, path = :path, container_id = :container_id WHERE id = :id';

	return db
		.execQuery(sql,
			{
				id: route.id, title: route.title, path: route.path, container_id: route.container_id,
			})
		.then((data) => data)
		.catch((err) => err);
};

exports.add = (route) => {
	const sql = 'INSERT INTO routes (title, path, container_id) VALUES(:title, :path, :container_id)';

	return db
		.execQuery(sql,
			{ title: route.title, path: route.path, container_id: route.container_id })
		.then((data) => data)
		.catch((err) => err);
};

exports.del = (route) => {
	const sql = 'DELETE FROM routes WHERE id = :id';

	return db
		.execQuery(sql, { id: route.id })
		.then((data) => data)
		.catch((err) => err);
};
