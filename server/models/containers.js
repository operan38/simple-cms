const db = require('../libs/db');

exports.getAll = () => {
	const sql = 'SELECT * FROM containers';

	return db
		.execQuery(sql)
		.then((data) => data)
		.catch((err) => err);
};
