const db = require('../db');

exports.get = () => {
    return db.execQuery('SELECT * FROM sections');
}

exports.getId = (id) => {
    return db.execQuery('SELECT * FROM sections WHERE routes_id = :id', {id: id});
}

exports.add = (routes_id) => {
    return db.execQuery('INSERT INTO sections (routes_id) VALUES(:routes_id)', {routes_id: routes_id});
}