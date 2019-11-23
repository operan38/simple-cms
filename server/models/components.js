const db = require('../db');

exports.get = () => {
    return db.execQuery('SELECT * FROM components');
}