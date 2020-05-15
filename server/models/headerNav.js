const db = require('../libs/db');

exports.getAll = () => {
	const sql = 'SELECT * FROM header_nav';

	return db
		.execQuery(sql)
		.then((data) => data)
		.catch((err) => err);
};
