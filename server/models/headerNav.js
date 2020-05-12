const db = require('../libs/db');

exports.getAll = (req, res) => {
	const sql = 'SELECT * FROM header_nav';

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
