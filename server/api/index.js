module.exports = app => {
    const router = require('express').Router();

    const routes = require('../models/routes');
    const containers = require('../models/containers');
    const users = require('../models/users');

    router.post('/routes', routes.getAll);
    router.post('/routes/add', routes.add);
    router.post('/routes/del', routes.del);

    router.post('/containers', containers.getAll);

    router.post('/users', users.getAll);

    app.use('/api', router);
}