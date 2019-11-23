const db = require('../db');

exports.get = () => {
    return db.execQuery('SELECT * FROM routes');
}

exports.getId = (id) => {
    return db.execQuery('SELECT * FROM routes WHERE id = :id', {id: id});
}

exports.add = (title, url) => {
    return db.execQuery('INSERT INTO routes (title, url) VALUES(:title,:url)', {title: title, url: url});
}