const db = require('../libs/db');

exports.getAll = (req, res) => {
	const sql = 'SELECT * FROM containers';

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
