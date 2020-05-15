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

exports.getById = (req, res, user) => {
	const sql = 'SELECT * FROM users WHERE id = :id';


	return db
		.execQuery(sql, { id: user.id })
		.then((data) => {
			if (data.length) { return data[0]; }
			res.status(400).json({
				message: `Not found id=${user.id}`,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.getByLogin = (req, res, login) => db
	.execQuery('SELECT id, login, password, surname, firstname, patronymic, admin, main_photo FROM users WHERE login = :login', { login })
	.then((data) => {
		if (login) {
			return data[0];
		}

		return res.status(400).json({
			message: 'Not found login',
		});
	})
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
			if (data.length) {
				res.json(data);
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.updMainPhoto = (req, res, user) => {
	const sql = 'UPDATE users SET main_photo = :main_photo WHERE id = :id';

	db.execQuery(sql, { id: user.id, main_photo: user.main_photo })
		.then((data) => {
			if (user.id) {
				res.json(data);
			} else {
				res.status(400).json({
					message: 'Not found id',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.updFIO = (req, res, user) => {
	const sql = 'UPDATE users SET surname = :surname, firstname = :firstname, patronymic = :patronymic WHERE id = :id';

	db.execQuery(sql, {
		id: user.id, surname: user.surname, firstname: user.firstname, patronymic: user.patronymic,
	})
		.then((data) => {
			if (user.id) {
				res.json(data);
			} else {
				res.status(400).json({
					message: 'Not found user id',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.updPassword = (req, res, user) => {
	const sql = 'UPDATE users SET password = :password WHERE id = :id';

	db.execQuery(sql, { id: user.id, password: user.password })
		.then((data) => {
			if (user.id) {
				res.json(data);
			} else {
				res.status(400).json({
					message: 'Not found user id',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
};
