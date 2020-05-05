const db = require('../libs/db');

exports.getAll = (req, res) => {
	const sql = 'SELECT * FROM users';

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

exports.getById = (req, res) => {
	const user = {
		id: req.params.id,
	};

	const sql = 'SELECT * FROM users WHERE id = :id';

	return db
		.execQuery(sql, { id: user.id })
		.then((data) => {
			if (data.length) { res.json(data[0]); } else {
				res.status(400).json({
					message: `Not found id=${user.id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.getByLogin = (req, res, login) => db
	.execQuery('SELECT id, login, password, admin FROM users WHERE login = :login', { login })
	.then((data) => data[0])
	.catch((err) => {
		res.status(500).json({
			message: err,
		});
	});

exports.add = (req, res, user) => {
	const sql = 'INSERT INTO users (surname, firstname, patronymic, login, password, mail) VALUES(:surname, :firstname, :patronymic, :login, :password, :mail)';

	db.execQuery(sql,
		{
			surname: user.surname,
			firstname: user.firstname,
			patronymic: user.patronymic,
			login: user.login,
			password: user.password,
			mail: user.mail,
		})
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};
