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
    });
}
    
exports.getByLogin = (req, res, login) => {
    return db.execQuery('SELECT id, login, password FROM users WHERE login = :login', { login: login }).then((data) => {
        return data;
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            message: err
        });
    });
}

exports.add = (req, res, user) => {
    
    return db.execQuery('INSERT INTO users (surname, firstname, patronymic, login, password, mail) VALUES(:surname, :firstname, :patronymic, :login, :password, :mail)', 
    {surname: user.surname, firstname: user.firstname, patronymic: user.patronymic, login: user.login, password: user.password, mail: user.mail}).then((data) => {
        res.send(true);
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            message: err
        });
    });;
}