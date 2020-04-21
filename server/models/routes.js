const db = require('../libs/db');

exports.getOnlyAll = () => {
    return db.execQuery('SELECT * FROM routes');
}

exports.getAll = (req, res) => {
    return db.execQuery('SELECT * FROM routes').then((data) => {
        res.send(data);
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            message: err
        });
    });;
}

exports.getById = (req, res) => {

    const route = { // /route/:id
        id: req.params.id,
    };

    return db.execQuery('SELECT * FROM routes WHERE id = :id', {id: route.id}).then((data) => {
        if (data.length != 0)
            res.send(data);
        else
            next(err);
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            message: "Not found id=" + id
        });
    });;
}

exports.add = (req, res) => {

    const route = {
        title: req.body.title,
        path: req.body.path,
    };

    return db.execQuery('INSERT INTO routes (title, path) VALUES(:title, :path)', {title: route.title, path: route.path}).then((data) => {
        res.send(true);
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            message: err
        });
    });;
}

exports.del = (req, res) => {

    const route = {
        id: req.body.id,
    };

    return db.execQuery('DELETE FROM routes WHERE id = :id', {id: route.id}).then((data) => {
        res.send(true);
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            message: err
        });
    });;
}