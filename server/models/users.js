const db = require('../libs/db');

exports.getAll = (req, res) => {

    const sql = `SELECT * FROM users`;

    return db.execQuery(sql).then((data) => {
        res.send(data);
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            message: err
        });
    });;
}