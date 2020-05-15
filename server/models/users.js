const db = require('../libs/db');

exports.getAll = () => {
	const sql = 'SELECT * FROM users';

	return db
		.execQuery(sql)
		.then((data) => data)
		.catch((err) => err);
};

exports.getById = (user) => {
	const sql = 'SELECT * FROM users WHERE id = :id';

	return db
		.execQuery(sql, { id: user.id })
		.then((data) => data)
		.catch((err) => err);
};

exports.getByLogin = (login) => db
	.execQuery('SELECT id, login, password, surname, firstname, patronymic, admin, main_photo FROM users WHERE login = :login', { login })
	.then((data) => data)
	.catch((err) => err);

exports.add = (user) => {
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
		.then((data) => data)
		.catch((err) => err);
};

exports.updMainPhoto = (user) => {
	const sql = 'UPDATE users SET main_photo = :main_photo WHERE id = :id';

	db.execQuery(sql, { id: user.id, main_photo: user.main_photo })
		.then((data) => data)
		.catch((err) => err);
};

exports.updFIO = (user) => {
	const sql = 'UPDATE users SET surname = :surname, firstname = :firstname, patronymic = :patronymic WHERE id = :id';

	db.execQuery(sql, {
		id: user.id, surname: user.surname, firstname: user.firstname, patronymic: user.patronymic,
	})
		.then((data) => data)
		.catch((err) => err);
};

exports.updPassword = (user) => {
	const sql = 'UPDATE users SET password = :password WHERE id = :id';

	db.execQuery(sql, { id: user.id, password: user.password })
		.then((data) => data)
		.catch((err) => err);
};
