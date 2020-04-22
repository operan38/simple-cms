const db = require('../libs/db');

exports.getOnlyAll = () => {
    return db.execQuery('SELECT * FROM routes');
}

exports.getAll = (req, res) => {

    const sql = `SELECT routes.id as id, routes.title as title, routes.path as path, 
    containers.id as container_id, containers.title as container_title, containers.path as container_path
    FROM routes JOIN containers ON routes.container_id = containers.id`;

    return db.execQuery(sql).then((data) => {
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
        container_id: req.body.container_id
    };

    return db.execQuery('INSERT INTO routes (title, path, container_id) VALUES(:title, :path, :container_id)', {title: route.title, path: route.path, container_id: route.container_id}).then((data) => {
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