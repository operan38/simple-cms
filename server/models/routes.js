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
			console.error(err);
			res.status(500).json({
				message: err,
			});
		});
};

exports.getById = (req, res) => {
	const route = {
		id: req.params.id,
	};

	return db
		.execQuery('SELECT * FROM routes WHERE id = :id', { id: route.id })
		.then((data) => {
			if (data.length) { res.json(data[0]); } else {
				res.status(400).json({
					message: `Not found id=${route.id}`,
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

exports.upd = (req, res) => {
	const route = {
		id: req.body.id,
		title: req.body.title,
		path: req.body.path,
		container_id: req.body.container_id,
	};

	return db
		.execQuery(
			'UPDATE routes SET title = :title, path = :path, container_id = :container_id WHERE id = :id',
			{
				id: route.id, title: route.title, path: route.path, container_id: route.container_id,
			},
		)
		.then((data) => {
			console.log(data);
			res.json(true);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				message: err,
			});
		});
};

exports.add = (req, res) => {
	const route = {
		title: req.body.title,
		path: req.body.path,
		container_id: req.body.container_id,
	};

	return db
		.execQuery(
			'INSERT INTO routes (title, path, container_id) VALUES(:title, :path, :container_id)',
			{ title: route.title, path: route.path, container_id: route.container_id },
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
};

exports.del = (req, res) => {
	const route = {
		id: req.body.id,
	};

	return db
		.execQuery('DELETE FROM routes WHERE id = :id', { id: route.id })
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
