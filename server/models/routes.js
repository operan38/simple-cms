const db = require('../libs/db');

exports.getOnlyAll = () => db.execQuery('SELECT * FROM routes');

exports.getAll = (req, res) => {
	const sql = `SELECT routes.id as id, routes.title as title, routes.path as path, 
    containers.id as container_id, containers.title as container_title, containers.path as container_path
    FROM routes JOIN containers ON routes.container_id = containers.id`;

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

exports.getById = (req, res, route) => {
	const sql = 'SELECT * FROM routes WHERE id = :id';

	return db
		.execQuery(sql, { id: route.id })
		.then((data) => {
			if (data.length) { res.json(data[0]); } else {
				res.status(400).json({
					message: `Not found id=${route.id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.upd = (req, res, route) => {
	const sql = 'UPDATE routes SET title = :title, path = :path, container_id = :container_id WHERE id = :id';

	return db
		.execQuery(sql,
			{
				id: route.id, title: route.title, path: route.path, container_id: route.container_id,
			})
		.then((data) => {
			if (route.id) {
				res.json(data);
			} else {
				res.status(400).json({
					message: `Not found id=${route.id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.add = (req, res, route) => {
	const sql = 'INSERT INTO routes (title, path, container_id) VALUES(:title, :path, :container_id)';

	return db
		.execQuery(sql,
			{ title: route.title, path: route.path, container_id: route.container_id })
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.del = (req, res, route) => {
	const sql = 'DELETE FROM routes WHERE id = :id';

	return db
		.execQuery(sql, { id: route.id })
		.then((data) => {
			if (route.id) {
				res.json(data);
			} else {
				res.status(400).json({
					message: `Not found id=${route.id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};
