const mysql = require('mysql');
const config = require('./config');

let connection;

exports.connect = () => new Promise((resolve, reject) => {
    
    let mysqlConnection = mysql.createConnection(config.db);

    mysqlConnection.connect((err) => {
        if (err) {
            return reject('Ошибка при подключении к базе данных\n Ошибка: ' + JSON.stringify(err));
        }
        else {
            connection = mysqlConnection;
            return resolve(`Соединение с базой данных установлено на порту ${connection.config.port}`);
        }
    });

    mysqlConnection.on('error', error => {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Соединение с базой данных потеряно, попытка переподключиться...');
            return setTimeout(() => exports.connect(), 1000);
        }

        throw error;
    })

    // Формат запроса

    mysqlConnection.config.queryFormat = function (query, values) {
        if (!values) return query;
        return query.replace(/\:(\w+)/g, function (txt, key) {
            if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
            }

            return txt;
        }.bind(this));
    };
});

exports.get = () => {
    return connection;
}

exports.execQuery = (query, values = {}) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, rows, fields) => {
            if (!err)
                resolve(rows);
            else
                reject(err);
        });
    });
}