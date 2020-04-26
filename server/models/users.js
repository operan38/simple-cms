const db = require('../libs/db');

exports.getAll = (req, res) => {
	const sql = 'SELECT * FROM users';

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

exports.getByLogin = (req, res, login) => db
	.execQuery('SELECT id, login, password FROM users WHERE login = :login', { login })
	.then((data) => data)
	.catch((err) => {
		console.error(err);
		res.status(500).json({
			message: err,
		});
	});

exports.add = (req, res, user) => db
	.execQuery(
		'INSERT INTO users (surname, firstname, patronymic, login, password, mail) VALUES(:surname, :firstname, :patronymic, :login, :password, :mail)',
		{
			surname: user.surname,
			firstname: user.firstname,
			patronymic: user.patronymic,
			login: user.login,
			password: user.password,
			mail: user.mail,
		},
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
