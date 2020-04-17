const db = require('../libs/db');

exports.getAll = () => {
    return db.execQuery('SELECT * FROM routes');
}

exports.getById = (id) => {
    return db.execQuery('SELECT * FROM routes WHERE id = :id', {id: id});
}

exports.add = (title, url) => {
    return db.execQuery('INSERT INTO routes (title, url) VALUES(:title, :url)', {title: title, url: url});
}

exports.del = (id) => {
    return db.execQuery('DELETE FROM routes WHERE id = :id', {id: id});
}