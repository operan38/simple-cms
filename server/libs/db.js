const mysql = require('mysql');
const config = require('../config');

let connection;

exports.connect = () => new Promise((resolve, reject) => {
	const mysqlConnection = mysql.createConnection(config.db);

	mysqlConnection.connect((err) => {
		if (err) {
			return reject(err);
		}
		connection = mysqlConnection;
		return resolve(
			`Соединение с базой данных установлено. (Порт: ${connection.config.port})`,
		);
	});

	mysqlConnection.on('error', (error) => {
		if (error.code === 'PROTOCOL_CONNECTION_LOST') {
			console.error('Соединение с базой данных потеряно. Переподключение...');
			return setTimeout(() => exports.connect(), 1000);
		}
		throw error;
	});

	// Формат запроса

	// eslint-disable-next-line func-names
	mysqlConnection.config.queryFormat = function (query, values) {
		if (!values) return query;
		return query.replace(
			// eslint-disable-next-line no-useless-escape
			/\:(\w+)/g,
			(txt, key) => {
				// eslint-disable-next-line no-prototype-builtins
				if (values.hasOwnProperty(key)) {
					return this.escape(values[key]);
				}
				return txt;
			},
		);
	};
});

exports.get = () => connection;

exports.execQuery = (query, values = {}) => new Promise((resolve, reject) => {
	connection.query(query, values, (err, rows, fields) => {
		if (!err) resolve(rows);
		else reject(err);
	});
});
