const mysql = require('mysql');

let connection;

exports.connect = (config) => new Promise((resolve, reject) => {
    
    let mysqlConnection = mysql.createConnection(config.db);

    mysqlConnection.connect((err) => {
        if (!err) {
            connection = mysqlConnection;
            return resolve(`Соединение с базой данных установлено на порту ${connection.config.port}`);
        }
        else {
            return reject('Ошибка при подключении к базе данных\n Ошибка: ' + JSON.stringify(err));
        }
    });

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