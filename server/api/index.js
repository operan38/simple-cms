const express = require('express');
const router = express.Router();

const model = require('../models');

router.post('/sections/add', (req, res, next) => {
    //model.fragments.add(res.body).then((mes) => console.log(mes)).catch(err => console.log(err))
    model.sections.add(req.body['r-name'])
    .then((mes) => 
        console.log(mes))
    .catch(err => console.log(err));
        res.redirect('/');
});

router.post('/routes/add', (req, res, next) => {
    res.send(req.body);
});

router.post(['/:ctrl','/:ctrl/:action'], (req, res, next) => {
    console.log(req.params);
    res.send(req.params);
});

module.exports = router;