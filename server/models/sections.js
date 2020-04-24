const db = require('../libs/db');

exports.getAll = () => db.execQuery('SELECT * FROM sections');

exports.getById = (id) => db.execQuery('SELECT * FROM sections WHERE routes_id = :id', { id });

exports.add = (routesId) => db.execQuery('INSERT INTO sections (routes_id) VALUES(:routesId)', {
	routesId,
});

exports.del = (id) => db.execQuery('DELETE FROM sections WHERE id = :id', { id });
