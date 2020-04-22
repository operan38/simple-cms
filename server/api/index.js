module.exports = app => {
    const router = require('express').Router();

    const routes = require('../models/routes');
    const containers = require('../models/containers');

    router.post('/routes', routes.getAll);
    router.post('/routes/add', routes.add);
    router.post('/routes/del', routes.del);

    router.post('/containers', containers.getAll);

    //router.post('/routes/:id', routes.getById);


    app.use('/api', router);
}