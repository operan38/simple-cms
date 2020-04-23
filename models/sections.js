const db = require('../libs/db');

exports.getAll = () => {
    return db.execQuery('SELECT * FROM sections');
}

exports.getById = (id) => {
    return db.execQuery('SELECT * FROM sections WHERE routes_id = :id', {id: id});
}

exports.add = (routes_id) => {
    return db.execQuery('INSERT INTO sections (routes_id) VALUES(:routes_id)', {routes_id: routes_id});
}

exports.del = (id) => {
    return db.execQuery('DELETE FROM sections WHERE id = :id', {id: id});
}