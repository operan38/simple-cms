const express = require('express');
const router = express.Router();

const model = require('../models');

router.post('/sections/add', (req, res, next) => {
    //model.fragments.add(res.body).then((mes) => console.log(mes)).catch(err => console.log(err))
    /*model.sections.add(req.body['r-name'])
    .then((mes) => 
        console.log(mes))
    .catch(err => console.log(err));
        res.redirect('/');*/
});

router.post('/routes', (req, res, next) => {
    model.routes.getAll().then((data) => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err
        });
    });
});

/*router.post('/routes/:id', (req, res, next) => {
    const id = req.params.id

    model.routes.getById(id).then((data) => {
        if (data.length != 0)
            res.send(data);
        else
            next(err);
    }).catch(err => {
        res.status(500).send({
            message: "Not found id=" + id
        });
    });
});*/

router.post('/routes/add', (req, res, next) => {

    const route = {
        title: req.body.title,
        url: req.body.url,
    };

    model.routes.add(route.title, route.url).then((data) => {
        res.send(true);
    }).catch(err => {
        res.status(500).send({
            message: err
        });
    });
});

/*router.post(['/:ctrl','/:ctrl/:action'], (req, res, next) => {
    console.log(req.params);
    res.send(req.params);
});*/

module.exports = router;